export const ProjectFactory = (name) => {
    // This array is the "vault" where the Todo objects live
    let todos = [];

    

    // Here is that 'Mail Slot' (parameter) we discussed!
    // It takes a todo object and slides it into the vault.
    const addTodo = (todoObject) => {
        todos.push(todoObject);
    };

    const getTodos = () => todos;

    const removeTodo = (index) => {
        // Removes 1 item at the specific index position
        todos.splice(index, 1);
    };

    return { 
        name, 
        todos,
        addTodo, 
        getTodos, 
        removeTodo 
    };
};