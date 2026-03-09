import { TodoFactory } from "./todo";
import { renderTodos } from "./renderTodos";
import { ProjectFactory } from "./project";

export const createForm = (state) => {

    const formAnchor = document.getElementById('form-anchor')
    const form = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('textarea');
    const  dueDate = document.createElement('input');
    dueDate.type = 'date';
    
    const   priority = document.createElement('select');
    const   high =  document.createElement('option');
    const   medium = document.createElement('option');
    const   low = document.createElement('option');

    high.textContent = 'high';
    medium.textContent = 'medium';
    low.textContent = 'low';

        high.value = 'high';
    medium.value = 'medium';
    low.value = 'low';


    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low);


    
    const subBtn = document.createElement('button');
    
    
    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(subBtn);

    formAnchor.appendChild(form);

form.onsubmit = (e) => {
        e.preventDefault();

        // Debugging: See exactly what the form is looking at
    console.log("Current State:", state);

        const newTodo = TodoFactory(title.value, description.value, dueDate.value, priority.value);
        
        // Use state.current to find the "active" project
        state.addTodo(newTodo); 
        renderTodos(state);
        
        form.reset();
    };
    
    

}