export const TodoFactory = (title, description, dueDate, priority) => {
    // We keep 'completed' private inside the factory
    let completed = false;

    const toggleComplete = () => {
        completed = !completed;
    };

    const isComplete = () => completed;

    // We return an object containing the data and the functions
    return { 
        title, 
        description, 
        dueDate, 
        priority, 
        toggleComplete, 
        isComplete
    };
};