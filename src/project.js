// project.js
export const ProjectFactory = (name, existingTodos = []) => {
  let todos = [...existingTodos];

  // We still keep these functions here because they manage the ARRAY,
  // which is more complex than just flipping a true/false switch.
  const addTodo = (todo) => todos.push(todo);
  const getTodos = () => todos;
  const removeTodo = (index) => todos.splice(index, 1);

  return {
    name,
    todos,
    addTodo,
    getTodos,
    removeTodo,
  };
};
