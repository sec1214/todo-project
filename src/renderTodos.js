export const renderTodos = (project) => {
    const display = document.getElementById('todo-display');

    if (!project || !project.getTodos) {
        console.warn("Render aborted: No project provided.");
        return; 
    }
    display.innerHTML = ""; 

    // Use getTodos() to stay consistent with your Factory
    project.getTodos().forEach((todo, index) => {
        const card = document.createElement('div');
        // Ensure priority is lowercase for CSS matching
        card.className = `todo-card ${todo.priority.toLowerCase()}`;

        const info = document.createElement('div');
        info.className = 'todo-info';
        
        const title = document.createElement('h3');
        title.textContent = todo.title;

        const date = document.createElement('span');
        date.textContent = todo.dueDate || 'No Date';
        date.style.color = '#94a3b8';

        const delBtn = document.createElement('button');
        delBtn.className = 'del-btn';
        delBtn.textContent = 'Delete';
        
        delBtn.onclick = () => {
            // Use the method from your ProjectFactory!
            project.removeTodo(index); 
            renderTodos(project);
        };

        info.append(title);
        card.append(info, date, delBtn);
        display.appendChild(card);
    });
};