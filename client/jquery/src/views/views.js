// import { CONTAINER } from './common.js';
import todoService from '../services/todo-service.js';
import { toDoTemplate } from '../templates/display-todo-template.js';

// Internal for the module
const todoView = (todo, container) => {
  const $div = $(container);
  $div.append(toDoTemplate(todo));
}

const editTodoView = (todo, container) => {
  const $div = $(container);
  $div.html(`
  <div class="todo-single">
    <input id="edit-todo-name" type="text" value="${todo.name}" />
    <input id="edit-todo-date" type="date" value="${todo.due}"/>
    <button save-id="${todo.id}">Save</button>
  </div>
  `);
};

export const populateTodos = async (container) => {
  const $div = $(container);

  try {
    const response = await todoService.getTodos();
    const todos = await response.json();
    $div.empty();
    todos.forEach((todo) => todoView(todo, container));
  } catch (e) {
    alert(e.message);
  }
};

export const todoEdit = async (ev) => {
  const id = +$(ev.target).attr('edit-id');
  const data = await todoService.getTodos();
  const todos = await data.json();

  const todoFound = todos.find((todo) => todo.id === id);

  editTodoView(todoFound, CONTAINER);
};

export const todoSaveChanges = async (ev) => {
  const id = +$(ev.target).attr('save-id');

  const $text = $('#edit-todo-name');
  const $date = $('#edit-todo-date');

  try {
    if ($($date).val()) {
      const res = await todoService.updateTodo(id, $text.val(), $date.val());

      await populateTodos(CONTAINER);

      const data = await res.json();
      alert(data.msg);
    } else {
      alert('Invalid date!');
    }
  } catch (e) {
    alert(e.message);
  }
}

export const todoDelete = async (ev) => {
  const todoId = +$(ev.target).attr('data-id');

  try {
    await todoService.deleteTodo(todoId);
    await populateTodos(CONTAINER);
  } catch (e) {
    alert(e.message);
  }
};

export const todoToggle = async (ev) => {
  const todoId = +$(ev.target).attr('data-check-id');
  const checked = $(ev.target).attr('checked') ? false : true;

  try {
    const response = await todoService.updateToggleTodo(todoId, checked);
    await populateTodos(CONTAINER);
    const result = await response.json();
    alert(result.msg);
  } catch (e) {
    alert(e.message);
  }
};

export const todoAdd = async (ev) => {
  const $text = $('#todo-text')
  const $date = $('#todo-date')

  if (!$text.val()) {
    alert('Invalid todo text!');
    return;
  }
  if (!$date.val()) {
    alert('Invalid date!');
    return;
  }

  try {
    const response = await todoService.createTodo($text.val(), $date.val());
    $text.val();
    $date.val();

    await populateTodos(CONTAINER);
    const result = await response.json();
    alert(result.msg);
  } catch (e) {
    alert(e.message);
  }
};
