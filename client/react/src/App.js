import React, { useState } from 'react';
// import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import todos from './data/todos';
import CreateTodo from './components/Todo/CreateTodo/CreateTodo';
import CompletedTodos from './components/Todo/CompletedTodos/CompletedTodos';
import UncompletedTodos from './components/Todo/UncompletedTodos/UncompletedTodos';

const App = () => {
  const [appTodos, updateTodos] = useState(todos);

  const toggle = (id) => {
    if (appTodos[id]) {
      const updatedTodos = appTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }

        return { ...todo };
      });

      updateTodos(updatedTodos);
    }
  };

  const deleteTodo = (id) => {
    if (appTodos[id]) {
      const updatedTodos = appTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDeleted: true,
          };
        }

        return { ...todo };
      });

      updateTodos(updatedTodos);
    }
  };

  const createTodo = ({ name, due, isDone }) => {
    const id = appTodos.length;
    const createdTodo = {
      id,
      name,
      due,
      isDone,
      isDeleted: false,
    };

    updateTodos([createdTodo, ...appTodos]);
  };

  return (
    <div>
      <Header />
      <CreateTodo createTodo={createTodo} />
      <div className='Todo-container'>
        <UncompletedTodos
          todos={appTodos}
          toggle={toggle}
          deleteTodo={deleteTodo}
        />
        <CompletedTodos
          todos={appTodos}
          toggle={toggle}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;
