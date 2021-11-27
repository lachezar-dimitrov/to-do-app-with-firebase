import { BASE_URL } from './common.js';

const getTodos = () => fetch(`${BASE_URL}/todos`);

const createTodo = (name, due) => fetch(`${BASE_URL}/todos`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, due }),
});

const updateToggleTodo = (id, isDone) => fetch(`${BASE_URL}/todos/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ isDone }),
});

const updateTodo = (id, name, due) => fetch(`${BASE_URL}/todos/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, due })
})

const deleteTodo = (id) => fetch(`${BASE_URL}/todos/${id}`, {
  method: 'DELETE',
});

const todoService = {
  getTodos,
  createTodo,
  updateToggleTodo,
  deleteTodo,
  updateTodo,
};

export default todoService;
