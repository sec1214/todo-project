export const renderTodos = (project) => {
    const display = document.getElementById('todo-display');

    // THE FIX: If project is undefined or null, stop here!
    if (!project || !project.todos) {
        console.warn("Render aborted: No project provided.");
        return; 
    }
    display.innerHTML = ""; 

    project.getTodos().forEach((todo, index) => {
        const card = document.createElement('div');
        card.className = `todo-card ${todo.priority}`;

        const info = document.createElement('div');
        info.className = 'todo-info';
        
        const title = document.createElement('h3');
        title.textContent = todo.title;

        const date = document.createElement('span');
        date.textContent = todo.dueDate;
        date.style.color = '#94a3b8';

        const delBtn = document.createElement('button');
        delBtn.className = 'del-btn';
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
            project.todos.splice(index, 1);
            renderTodos(project);
        };

        info.append(title);
        card.append(info, date, delBtn);
        display.appendChild(card);
    });
};