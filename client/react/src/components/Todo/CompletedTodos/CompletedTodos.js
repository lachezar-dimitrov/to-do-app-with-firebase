import React from 'react';
import PropTypes from 'prop-types';
import Todo from './../Todo';
import './CompletedTodos.css';

const CompletedTodos = ({ todos, toggle, deleteTodo }) => {
  // const [completedTodos, updateTodos] = useState(todos);

  const renderTodo = () => {
    const todosToShow = todos.filter(
      (todo) => todo.isDone === true && todo.isDeleted === false
    );

    return todosToShow.length === 0
      ? null
      : todosToShow.map((todo, index) => {
          return (
            <Todo
              key={index}
              todo={todo}
              toggle={toggle}
              deleteTodo={deleteTodo}
            />
          );
        });
  };

  return (
    <div>
      <h2>Completed todos</h2>
      {renderTodo() || (
        <h3 className='everything-todo'>
          Keep pushing! Module 3 will end soon!
        </h3>
      )}
    </div>
  );
};

export default CompletedTodos;

CompletedTodos.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};
