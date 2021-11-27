import { formatDate } from './../services/time-service.js'
export const toDoTemplate = (todo) => {
  return `
  <div>
    <span class="${todo.isDone ? 'todo-done' : ''}">${todo.name} - ${formatDate(date)}</span>
    <input data-check-id="${todo.id}" type="checkbox" ${todo.isDone ? 'checked' : ''}/>
    <button data-id="${todo.id}">X</button>
    <button edit-id="${todo.id}">Edit</button>
  </div>
  `;
}

