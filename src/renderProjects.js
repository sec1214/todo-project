import { renderTodos } from "./renderTodos";
import { ProjectFactory } from "./project";

export function renderProjectList(projectsArray, stateManager){
    const listContainer = document.getElementById('project-list');
    listContainer.innerHTML = "";

    projectsArray.forEach((project, index) => {
        // Container for Project Button + Delete Button
        const projectWrapper = document.createElement('div');
        projectWrapper.className = "project-wrapper";

        const projectBtn = document.createElement('button');
        projectBtn.textContent = project.name;
        projectBtn.className = "project-btn";

        if(project === stateManager.current) projectBtn.classList.add('active');

        projectBtn.onclick = () => {
            stateManager.current = project; 
            renderTodos(project);
            renderProjectList(projectsArray, stateManager);
        };

        // --- THE DELETE BUTTON LIVES HERE (Inside the loop) ---
        const delBtn = document.createElement('button');
        delBtn.textContent = "X";
        delBtn.className = "del-project-btn";

        delBtn.onclick = (e) => {
            e.stopPropagation(); // Prevents the project from being selected when deleting
            projectsArray.splice(index, 1); // Remove from array
            
            // If we deleted the active project, reset view to first project
            if(stateManager.current === project) stateManager.current = projectsArray[0];
            
            renderProjectList(projectsArray, stateManager);
        };

        projectWrapper.appendChild(projectBtn);
        projectWrapper.appendChild(delBtn);
        listContainer.appendChild(projectWrapper);
    });

    // --- ADD PROJECT BUTTON ---
    const addBtn = document.createElement('button');
    addBtn.textContent = "+ New Project";
    addBtn.onclick = () => {
        const title = prompt("Enter Project Name:");
        if(title){
            const newProj = ProjectFactory(title);
            projectsArray.push(newProj);
            renderProjectList(projectsArray, stateManager);
        }
    };
    listContainer.appendChild(addBtn);
}