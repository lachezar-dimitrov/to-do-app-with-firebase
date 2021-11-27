<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

## React ToDo Client

### 1. Description

Seems like the whole front-end team you had been working with to deliver the Todo app got fired and now its your job to do it! Use the Todo API you have created and create a Todo web client with React to consume the API and satisfy the customers.

<br>

### 2. Project information

You will be using React with functional components to build the client app. The activity is continuous and ongoing, and each activity after the first one will build on the previous one refactoring existing code and adding new functionality. You will be provided with the ToDo Server at a later point

<br>

### 3. Goals

Now that we have the basic design of the app and a way to visualize `todo`s it's your role to extend the application with a way to create and add new todos to the list of todos. You will need to implement the new `CreateTodo` component, which should be shown on a condition and which should visualize a set of fields for creating a todo and validate the data.

We will exercise the following:

- extending the application with new components
- conditional rendering of a component/element
- rendering dynamic collections of data with listing (mapping to) components
- reading from and validation data inputs

<br>

### 4. Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<br>

### 5. The single `Todo` component

Right now we have 3 hardcoded todo items in the app and we are using the following render code in the `App` component to visualize every single todo

```jsx
<div>
  <Header />
  <div className="Todo-container">
    <Todo todo={appTodos[0]} toggle={toggle} />
    <Todo todo={appTodos[1]} toggle={toggle} />
    <Todo todo={appTodos[2]} toggle={toggle} />
  </div>
</div>
```

The problem is this will not work for dynamic or arbitrary array size when the data is retrieved from an API or otherwise. We will not know *how many* elements need to be visualized. You need to apply the power of functional programming and use the correct array method to convert the todos to `Todo` components. You can use array methods directly into the `jsx` code

```jsx
<div>
  <Header />
  <div className="Todo-container">
    { /* Your JS code here */ }
  </div>
</div>
```

When you create the component `jsx` code dynamically you need to provide the unique `key` property in the component:

```jsx
<Todo key={unique_key_here} ... />
```

<br>

### 6. Adding new todos

You already have a method that toggles the `isDone` state of a single todo, now you need to implement the `createTodo` method that will add a new todo to the list. Remember state is immutable and you can't just say

```js
appTodos.push(todo); // this will not work
```

Instead you need to compose the new state and add the new todo there.

The `createTodo` methods will have the following signature:

```js
const createTodo = ({ name, due, isDone}) => {
  // missing implementation
}
```

And we're using object destructuring in order to keep the passed `todo` object safe from mutation.

<br>

### 7. The `CreateTodo` component

You need to create the new `CreateTodo` component. It will receive a reference to the `createTodo` function as a prop and call it with the new todo that will be added to the state of the parent `App` component.

In its complete form it should look similar to this (ignore styling)

![CreateTodo Preview](./images/create-todo.PNG)

It should hold the value of each of the three fields - `name`, `due`, `isDone`. Each value should saved inside the component function and the values should be updated when changes are made to each input field.

When you click the `Create` button it should do the following:

- compose the `todo` object
- validate the value of each `todo` property - the `name` should not be empty string, the `due` date should not be an empty string - and if the property is not valid - it should *alert* the error to the user and stop executing the function
- call the `createTodo` function referenced passed by the parent component as a prop to the `CreateTodo` component
- *tell* the `App` component to hide the `CreateTodo` component

Don't forget to validate all of the component's props via `propTypes`.

<br>

### 8. Showing and hiding the `CreateTodo` component

Finally, you need to add a `Create Todo` button the `App`'s view. When you click the button the `CreateTodo` component should show. The `CreateTodo` component should show until one of the two conditions is met:

- you click the `Create Todo`'s `Create` button, add a new todo to the `App`'s state and hide the `CreateTodo` component
- you click on the `Create Todo`'s `Cancel` button

Because the `App` component holds the state of the application, think of a way to handle the logic for handling showing/hiding the child `CreateTodo` component so changes to the factors dictating the showing conditions can be triggered from the `App` component itself and from `CreateTodo` as well.
