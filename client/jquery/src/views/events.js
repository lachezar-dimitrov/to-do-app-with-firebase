import { addButton, removeFavorite } from "../common/common.js";

const addTodo = (callback) => $(document).on('click', addButton, callback);

const deleteTodo = (callback) => $(document).on('click', '[data-id]', callback);
//  const deleteTodo = (callback) => $(document).on('click', removeFavorite, callback);

const toggleTodo = (callback) => $(document).on('click', '[data-check-id]', callback);

const editTodo = (callback) => $(document).on('click', '[edit-id]', callback);

const saveTodoChanges = (callback) => $(document).on('click', '[save-id]', callback);

export { addTodo, deleteTodo, toggleTodo, editTodo, saveTodoChanges };