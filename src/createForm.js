import { TodoFactory } from "./todo";
import { renderTodos } from "./renderTodos";

export const createForm = (state) => {
    const anchor = document.getElementById('form-anchor');
    const form = document.createElement('form');
    form.className = 'todo-form-container'; // THIS MUST MATCH CSS

    const title = Object.assign(document.createElement('input'), { placeholder: 'Title', required: true, className: 'form-input' });
    const desc = Object.assign(document.createElement('input'), { placeholder: 'Description', className: 'form-input' });
    const date = Object.assign(document.createElement('input'), { type: 'date', className: 'form-date' });
    
    const priority = document.createElement('select');
    priority.className = 'form-select';
    ['high', 'medium', 'low'].forEach(lvl => priority.add(new Option(lvl, lvl)));

    const btn = Object.assign(document.createElement('button'), { textContent: 'Add', type: 'submit', className: 'submit-btn' });

    form.append(title, desc, date, priority, btn);
    anchor.appendChild(form);

    form.onsubmit = (e) => {
        e.preventDefault();
        const todo = TodoFactory(title.value, desc.value, date.value, priority.value);
        state.current.addTodo(todo);
        renderTodos(state.current);
        form.reset();
    };
};