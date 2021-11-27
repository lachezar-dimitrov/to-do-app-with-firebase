<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

## React ToDo Client

### 1. Description

Seems like the whole front-end team you had been working with to deliver the Todo app got fired and now its your job to do it! Use the Todo API you have created and create a Todo web client with React to consume the API and satisfy the customers.

<br>

### 2. Project information

You will be using React with functional components to build the client app. The activity is continuous and ongoing, and each activity after the first one will build on the previous one refactoring existing code and adding new functionality. You will be provided with the ToDo Server at a later point

<br>

### 3. Goals

Now that we can visualize, update the `isDone` status and create new todos it's time to replace hardcoded todos data with real data from a running REST API, provided with the `template`. The **goal** is connect the app with the API, load todos from the server, send requests to create and update todos and keep the app data in sync with the API.

We will exercise the following:

- extending the application with new components
- connecting and making request to a REST API
- using asynchronous code in React
- fetching data from a REST API
- handling HTTP request errors
- handing state changes depending on asynchronous calls

<br>

### 4. Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Please note the start command has been changed to `set PORT=4000 && react-scripts start` in order to run the React client on a different port than the Todo API, which runs on port 3000.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<br>

### 5. Todo API server

You have been provided with the REST API Todo server, which is located in the `api` folder. Make sure you have the following `.env` file in the `api` folder (or if you don't - create it) with the following keys

```txt
PORT=3000
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=1234
DB_DATABASE_NAME=tododb
JWT_SECRET=s3cr37
JWT_EXPIRE_TIME=1000000
```

Make sure to change the settings of the file to match you DB setup.

As you know using TypeORM will generate the necessary database objects. Still, do not forget to:
  1. Start your MariaDB / MySQL server
  2. Create the schema - **tododb**

You cans start the server with `npm run start` (or `npm run start:dev` if you plan to make changes to it).

You will utilize the following endpoints:

- `GET /todos`
- `POST /todos`
- `PUT /todos/:id`

Take a look at the Nestjs Todos API to see what is the correct data format of the body for the `POST` and `PUT` requests.

To be able to test creating and updating todos, you need to have at least one user in the database, and the default user should have `admin` as its username.

<br>

### 6. What stays the same

Since the `App` component holds the app's state and is ultimately responsible for adding and updating todos to the list, you don't need to make changes to the single `Todo` component and to the `CreateTodo` component. Using single responsible components and composing them in other components allows us to decouple the application logic. You will be making changes to the `App` component mainly and adding a few new components.

<br>

### 7. New components

Making requests to the server with async functions like `fetch` requires us to handle a few more things:

- communicate to the user that the page is loading data from the server
- display data when it's loaded from the server
- display an error page when something goes wrong with the request

In order to accommodate for that you need to create a few more components:

- the `AppError` component which will show when there is some error with the request to the API
- the `Loading` component which will show when the app is still waiting for the data to come from the server

We will also need one more higher-order component which will be a `container` for other components and elements.

<br>

### 8. The `AppError` component

The `AppError` component takes an error `message` prop and just shows the message.

```js
const AppError = ({ message }) => {
  // render code here
};
```

The `message` prop should be a `string`.

<br>

### 9. The `Loading` component

The `Loading` component is a higher-order component that takes no props, but will render one pass child element:

```js
const Loading = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
};

Loading.propTypes = {
  children: PropTypes.element.isRequired,
};
```

You can now do that

```js
<Loading>
  <h1>Todos are loading...</h1>
</Loading>
```

<br>

### 10. The `Container` component

The `Container` component is similar to the `Loading` component in the way that it also is a higher-order components, doesn't take any props and renders one or more children. Since it will be the main view container of the app, you can apply any stylization for the main view here. We will talk more about that in the next assignment.

Prop validation for the children is a bit more complicated, since there could be one or more child components passed to the container:

```js
Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
```

<br>

### 11. Making calls to the API

You can now setup everything necessary to make calls to the Todos API. Create a new directory `src/common` and there create the `constants.js` file which will hold all app constants. For now it will only have the base url of the API:

```js
export const BASE_URL = 'http://localhost:3000';
```

You will be using `fetch` to make calls to the API. Because React doesn't support `async` function style, you will need to use promises and chaining:

```js
fetch(`${BASE_URL}/todos`)
  .then(response => response.json())
  .then(/* consume the data */)
  .catch(/* handle errors */)
```

Note: `fetch` will only reject when the query fails. It will resolve (the request will return response) even if the server sends status code 4xx or 5xx. You will need to check if the response contains the requested data or just an error message and throw the error yourself in order to reject the promise chain and enter the `catch` method:

```js
// server responds with 401
fetch(/* endpoint */)
  .then(response => response.json())
  .then(result => {
    if (result.error) {
      throw new Error(result.message); // this will go to "catch(/* handle errors */)"
    }

    // results here holds the successful response
    // handle state updates
  })
  .catch(/* handle errors */)
```

<br>

### 12. `App` component state changes

Some significant changes need to be done to the `App` component. You will need to consider the following:

- when the component is initialized it should make a call to the API to retrieve the list of all todos
- while the component is waiting for the response it should be in the `loading` state when it should only show the `Loading` component
- when the component receives the list of all todos, it should update its todos state and *no longer* be loading - instead it should render the todos
- if the request fails, the component should change its state to `error` and show the `AppError` component with the correct error message

You will need to make the call to the API the first time you load the component. For this you should put the request inside a `useEffect` hook:

```js
useEffect(() => {
  // set the state to loading
  // make a call to the API
  // if data is retrieved successfully set the loading state to false and render data
  // if there is an error, set the error state to true and show the AppError component
}, []); // pass an empty array of dependencies, the request doesn't depend on any other data inside the component
```

You should also implement the following functions:

```js
const toggle = id => {
  // find the todo with id
  // show an error if it doesn't exist and return

  // make a call to  PUT /todos/:id and pass the updated todo
  // if the request is successful update the list of all todos with the changes and change loading to false
  // if there is an error change the error state to true and display the AppError component
};
```

```js
const createTodo = ({ name, due, isDone}) => {
  // hide the create form
  // change the loading state to true
  // make a call to  POST /todos and pass the new todo
  // if the request is successful add the created todo to the list of todos and change loading to false
  // if there is an error change the error state to true and display the AppError component

  fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      due,
      isDone,
    }),
  })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        throw new Error(result.message);
      }

      updateTodos([...appTodos, result]);
    })
    .catch(error => setError(error.message))
    .finally(() => setLoading(false));
};
```

<br>

### 13. Rendering different "pages" based on state changes

Now you can imitate a SPA application by switching between different views based on what the state of the `App` component is. There are the following cases:

- the state is in loading: `loading` is true, `error` is `null`
- the state is in error: `loading` is false, `error` is a `string` (the error message)
- the state is stable, show the `CreateTodo` component: `loading` is false, `error` is `null`, `isCreateFormVisible` is true
- default state, when all the data is loaded and no further changes are pending on waiting request - show all todos

To make this easier for you to understand and handle you are provided with the following template:

```jsx
const App = () => {
  // load todos
  // functions for handling changes and creating todos

  // show loading "page"
  if (loading) {
    return (
      <div>
        <Header />
        <Container>
          <Loading>
            <h1>Loading todos...</h1>
          </Loading>
        </Container>
      </div>
    )
  }

  // show error "page"
  if (error) {
    return (
      <div>
        <Header />
        <Container>
          <AppError message={error} />
        </Container>
      </div>
    )
  }

  // show create todo "page"
  if (isCreateFormVisible) {
    return (
      <div>
        <Header />
        <Container>
          <CreateTodo create={createTodo} close={hideCreateForm} />
        </Container>
      </div>
    )
  }

  // default return
  // show all-todos "page"
  return (
    <div>
      <Header />
      <Container>
        <button id="create-todo-btn" onClick={() => toggleCreateForm(true)}>Create Todo</button>
        {appTodos && appTodos.map(todo => <Todo key={todo.id} todo={todo} toggle={toggle} />)}
      </Container>
    </div>
  );
}
```
