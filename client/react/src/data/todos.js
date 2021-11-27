export const todos = [
  {
    id: 0,
    name: 'Buy Milk',
    due: '2020-07-20',
    isDone: true,
  },
  {
    id: 1,
    name: 'Learn JavaScript',
    due: '2020-09-01',
    isDone: false,
  },
  {
    id: 2,
    name: 'Learn React',
    due: '2020-8-20',
    isDone: false,
  },
];

let id = todos.length;

export const nextTodoId = () => id++;

export default todos;
