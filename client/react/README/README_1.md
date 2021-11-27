<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

## React ToDo Client

### 1. Description

Seems like the whole front-end team you had been working with to deliver the Todo app got fired and now its your job to do it! Use the Todo API you have created and create a Todo web client with React to consume the API and satisfy the customers.

<br>

### 2. Project information

You will be using React with functional components to build the client app. The activity is continuous and ongoing, and each activity after the first one will build on the previous one refactoring existing code and adding new functionality. You will be provided with the ToDo Server at a later point

<br>

### 3. Goals

Today, we will lay the foundations of this app. The **goal** is to design the main `App` component that will hold all of the `todos` and two other components - the `Header` component that will display the title of the app and the single `Todo` component which will represent each individual todo. And finally you will need to add a way for the `Todo` component to update the corresponding todo which is held in the `App` component's state.

We will exercise the following:

- creating functional components with React
- initializing and managing the state of a component
- detecting and reacting to DOM events
- passing state/props from parent to child component
- passing data/events from child to parent component
- validating and using props

<br>

### 4. Setting working environment

You are not provided with the template for this activity. You will need to initialize the project on your own

```cmd
npx create-react-app todo-client
```

Once the project is created you will need to set up a few other things in order to add a configure `eslint`

First, you need to install `eslint`

```cmd
npm i -D eslint@6 eslint-config-standard-react eslint-plugin-react
```

Then you need to create the `.eslintrc.json` file in your root directory and add the following

```json
{
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },

  "settings": {
    "react": {
      "version": "detect"
    }
  },

  "plugins": [
    "react"
  ],

  "extends": [
    "standard-jsx"
  ],

  "rules": {
    "react/jsx-no-bind": ["error", {
      "allowArrowFunctions": true,
      "allowBind": false,
      "ignoreRefs": true
    }],
    "react/no-did-update-set-state": "error",
    "react/no-unknown-property": "error",
    "react/no-unused-prop-types": "error",
    "react/prop-types": "error",
    "react/react-in-jsx-scope": "error",
    "comma-dangle": "off",
    "jsx-quotes": "off",
    "eol-last": "warn"
  }
}
```

**Note:** Make sure you have the `ESLint` extension for VSCode installed.

<br>

### 5. Available Scripts

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

### 6. Project structure

The raw template generated by the `create-react-app` script has two folders

- `public` - contains the `index.html` (compiled scripts will be injected in it), images, manifest files and favicon file.
- `src` - contains the actual app

Right now the `src` folder has a flat structure - you can see that it contains all the files necessary to run the app and add styling, it also contains the top-level `App` component which will serve as a container for all other components once we start creating them. In order to make the code base structure better we will create two folders inside the `src` folder:

- `components` will hold our components, and we will create a separate subfolder for every single component
- `data` will hold any static (hardcoded) data we will be utilizing

<br>

### 7. Todos data

Later on we will be working with live data - we will be fetching todos from the server and updating them using the REST API, but before we get there - and for the time being - we will be using hardcoded data. Go and create the `todos.js` file in `src/data`

```js
export const todos = [
  {
    id: 0,
    name: 'Buy Milk',
    due: '2020-07-20',
    isDone: true
  },
  {
    id: 1,
    name: 'Learn JavaScript',
    due: '2020-09-01',
    isDone: false
  },
  {
    id: 2,
    name: 'Learn React',
    due: '2020-8-20',
    isDone: false
  },
];

export default todos;
```

**Note:** React-style apps use default exports and imports.

<br>

### 8. App Component

The `App` component will hold the state of the client, which for now will only be the todos array. You can initialize the state from the hardcoded todos in `src/data/todos.js` and you will also need to use `updateTodos` to update the todos' state whenever necessary

```js
const [appTodos, updateTodos] = useState(todos);
```

You will also need to create the update method for the todos which for the time being will only switch the `isDone` state of the todo between `true` and `false`.

```js
  const toggle = id => {
    // your update code here
  }
```

<br>

### 9. Header Component

The `Header` component will only hold the header line of the app, and it should say `Todo App`. You may apply styling as you like.

<br>

### 10. Todo Component

The `Todo` component needs to be a little more complex - it should access props - one of the props should be the individual todo, and the other prop should be the toggle function reference passed by the "parent" `App` component

```js
const Todo = ({ todo, toggle }) => {
  // your component logic here
  // don't forget to call updateTodos
}
```

Because of the strict linting rules this will not compile - we need to validate the props using the `'prop-types'` utility. First, you need to import it

```js
import PropTypes from 'prop-types';
```

And then at the bottom of the component file you need to validate the props:

```js
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
};
```

**Note:** Make sure you add the `propTypes` property directly to the component function `Todo` (this is the equivalent of having a static property in a class).

For each individual todo you need to show the name of the todo, the finish date and the status

![Single Todo Preview](./images/todo-single.PNG)

When you click on the status checkbox it should change from check to unchecked and vise versa. (Hint: use the `toggle` function passed by the `App` component).

<br>

### 11. Putting it all together

Finally, the `App` component should use the `Header` and the `Todo` component, pass each single todo as a prop to a `<Todo />` component inside the returned JSX and also pass a reference to the `toggle` function:

```js
const App = () => {
  // state logic here

  return (
    <div>
      <Header />
      <div className="Todo-container">
        <Todo todo={appTodos[0]} toggle={toggle} />
        <Todo todo={appTodos[1]} toggle={toggle} />
        <Todo todo={appTodos[2]} toggle={toggle} />
      </div>
    </div>
  );
}
```

How does this work?

<br>

#### Passing state through props to "child" `Todo` component

For each single todo the `App` component passes the todo to the `Todo` component. Then the `Todo` component uses the `todo` prop to visualize it.

```
                   +---------------+
                   | App Component |
                   |    [State]    |
        +----------+-------+-------+----------+
        |                  |                  |
        |                  |                  |
 todo[0]|           todo[1]|           todo[2]|
        |                  |                  |
        |                  |                  |
+-------v-------+  +-------v-------+  +-------v-------+
|Todo Component |  |Todo Component |  |Todo Component |
+---------------+  +---------------+  +---------------+
```

<br>

#### Triggering the state update of the parent `App` component

Because the `App` component also passes to the `Todo` component the `toggle` method, each `Todo` component can call that method, elevating the change event from the child to the parent and letting the parent `App` update its state, before it passes it again to each individual `Todo`.

```
                    +---------------+
                    | App Component |
                    |    [State]    |
         +--------->+-------^-------+<---------+
         |                  |                  |
         |                  |                  |
toggle(0)|         toggle(1)|         toggle(2)|
         |                  |                  |
         |                  |                  |
 +-------+-------+  +-------+-------+  +-------+-------+
 |Todo Component |  |Todo Component |  |Todo Component |
 |               |  |               |  |               |
 +---------------+  +---------------+  +---------------+

```