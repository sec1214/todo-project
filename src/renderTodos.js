// src/renderTodos.js
export function renderTodos(project) {
    const display = document.getElementById('todo-display');
    display.innerHTML = ""; // Clear the old view

    project.getTodos().forEach((todo, index) => {
        const card = document.createElement('div');
        card.className = `todo-card ${todo.priority}`;
        
        card.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <small>Due: ${todo.dueDate}</small>
        `;

        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            project.removeTodo(index);
            renderTodos(project); // Refresh the view
        };

        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.isComplete() ? "✔️ Done" : "⭕ Mark Done";
        completeBtn.className = "complete-btn";

        if(todo.isComplete()){
            card.classList.add('completed');
        }

        completeBtn.onclick = () =>{
            todo.toggleComplete();
            renderTodos(project)
        }
        
        card.appendChild(completeBtn);
        card.appendChild(delBtn);
        display.appendChild(card);
    });
}