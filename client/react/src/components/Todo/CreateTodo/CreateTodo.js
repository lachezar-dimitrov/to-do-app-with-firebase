import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateTodo.css';
import moment from 'moment';

const CreateTodo = ({ createTodo }) => {
  const [todoName, setName] = useState('');
  const [todoDue, setDue] = useState(null);
  const [todoIsDone, setIsDone] = useState(false);
  const [toggleComponent, setToggleComponent] = useState(false);

  const todo = {
    name: '',
    due: moment().format(`YYYY-M-D`),
    isDone: false,
  };

  const updateTodoProp = (prop, value) => {
    todo[prop] = value;
  };

  const create = () => {
    if (!todoName) {
      return alert('Invalid input!');
    }

    if (!todoDue) {
      return alert(`Enter a valid due date!`);
    }

    const newTodo = {
      name: todoName,
      due: todoDue,
      isDone: todoIsDone,
    };

    createTodo(newTodo);
  };

  const inputName = () => {
    return (
      <div>
        <label htmlFor='todo-name' onClick={() => setToggleComponent(true)}>
          Name:
        </label>
        <input
          type='text'
          id='todo-name'
          name='todo-name'
          onChange={(event) => {
            updateTodoProp('name', event.target.value);
            // setName(event.target.value);
            setToggleComponent(true);
          }}
        />
      </div>
    );
  };

  const inputOthers = () => {
    return (
      <div className='create-todo-input-others'>
        <div>
          <label htmlFor='todo-date'>Due date:</label>
          <input
            type='date'
            id='todo-date'
            name='todo-date'
            onChange={(event) => {
              updateTodoProp('due', event.target.value);
              // setDue(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='todo-status'>Completed</label>
          <input
            type='checkbox'
            id='todo-status'
            name='todo-status'
            onChange={(event) => {
              updateTodoProp('isDone', event.target.checked);
              // setIsDone(event.target.checked);
            }}
          />
        </div>
        <div>
          <button className='button' onClick={createTodo}>
            Add
          </button>
          <button
            className='button cancel'
            onClick={() => setToggleComponent(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='create-todo-from'>
      <h2>Create a new todo</h2>
      {inputName()}
      {toggleComponent ? inputOthers() : null}
    </div>
  );
};

export default CreateTodo;

CreateTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};
