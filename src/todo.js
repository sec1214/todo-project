// todo.js
export const TodoFactory = (
  title,
  description,
  dueDate,
  priority,
  completed = false,
) => {
  return {
    title,
    description,
    dueDate,
    priority,
    completed,
  };
};
