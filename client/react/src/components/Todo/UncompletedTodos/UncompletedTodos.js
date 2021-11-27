import React from 'react';
import PropTypes from 'prop-types';
import Todo from './../Todo';
import './UncompletedTodos.css';

const UncompletedTodos = ({ todos, toggle, deleteTodo }) => {
  // const [completedTodos, updateTodos] = useState(todos);

  const renderTodo = () => {
    const todosToShow = todos.filter(
      (todo) => todo.isDone === false && todo.isDeleted === false
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
      <h2>Uncompleted todos</h2>
      {renderTodo() || (
        <h3 className='nothing-todo'>
          Looks like you have completed all you todos or you have nothing todo.
        </h3>
      )}
    </div>
  );
};

export default UncompletedTodos;

UncompletedTodos.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};
