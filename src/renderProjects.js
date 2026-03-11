import { renderTodos } from "./renderTodos.js";
import { saveToLocalStorage } from "./storage.js"; // Needed for deletions

export const renderProjectList = (projectsArray, stateManager) => {
  const listContainer = document.getElementById("project-list");

  if (!listContainer) return;

  listContainer.innerHTML = "";

  projectsArray.forEach((project, index) => {
    // 1. We create a list item (li) to hold our buttons
    const li = document.createElement("li");
    li.className = "project-wrapper";
    // This index helps the controller identify which project was clicked
    li.dataset.index = index;

    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;
    projectBtn.className = "project-btn";

    // Active State Logic
    if (project === stateManager.current) {
      projectBtn.classList.add("active");
    }

    projectBtn.onclick = () => {
      stateManager.current = project;
      renderProjectList(projectsArray, stateManager);
      // Pass both arguments to renderTodos so checkboxes work!
      renderTodos(stateManager.current, projectsArray);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.className = "del-project-btn";

    delBtn.onclick = (e) => {
      e.stopPropagation(); // Prevents the projectBtn from firing

      // 2. Delete the project from the array
      projectsArray.splice(index, 1);

      // 3. Keep LocalStorage in sync!
      saveToLocalStorage(projectsArray);

      // 4. Handle state if we just deleted the project the user was looking at
      if (stateManager.current === project) {
        stateManager.current =
          projectsArray.length > 0 ? projectsArray[0] : null;
      }

      renderProjectList(projectsArray, stateManager);
      renderTodos(stateManager.current, projectsArray);
    };

    li.appendChild(projectBtn);
    li.appendChild(delBtn);
    listContainer.appendChild(li);
  });
};
