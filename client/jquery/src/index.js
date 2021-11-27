import { deleteTodo, addTodo, toggleTodo, editTodo, saveTodoChanges } from './views/events.js';
import { todoDelete, todoToggle, todoAdd, populateTodos, todoEdit, todoSaveChanges } from './views/views.js';
import { CONTAINER, removeFavorite } from './common/common.js';

// document.onready
$(async () => {

  // top-level try-catch
  try {
    // Initial populate
    populateTodos(todos, CONTAINER);
    // addTodo(todoAdd(CONTAINER));
    addTodo(() => todoAdd(CONTAINER));
    deleteTodo((ev) => todoDelete(ev, CONTAINER));
    toggleTodo(() => alert('Todo Toggled!'));

    // await populateTodos(CONTAINER);

    // // Attach events here
    // addTodo(todoAdd);

    // editTodo(todoEdit);

    saveTodoChanges(todoSaveChanges);

    // toggleTodo(todoToggle);

    // deleteTodo(todoDelete);
  } catch (e) {
    alert(e.message)
  }

});

