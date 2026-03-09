import { TodoFactory } from "./todo";
import { renderTodos } from "./renderTodos";

export const createForm = (state) => {
    const anchor = document.getElementById('form-anchor');
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.gap = '10px';

    const title = Object.assign(document.createElement('input'), { placeholder: 'Task Title', required: true });
    const date = Object.assign(document.createElement('input'), { type: 'date' });
    const subBtn = Object.assign(document.createElement('button'), { textContent: 'Add Task', type: 'submit', className: 'submit-btn' });
    
    // Simple inline style for the button to match emerald
    subBtn.style.backgroundColor = '#10b981';
    subBtn.style.color = 'white';
    subBtn.style.border = 'none';
    subBtn.style.padding = '8px 16px';
    subBtn.style.borderRadius = '6px';

    form.append(title, date, subBtn);
    anchor.appendChild(form);

    form.onsubmit = (e) => {
        e.preventDefault();
        const newTodo = TodoFactory(title.value, "No description", date.value, "medium");
        state.current.addTodo(newTodo); 
        renderTodos(state.current);
        form.reset();
    };
}