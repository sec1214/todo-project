import { renderTodos } from "./renderTodos.js";

export const renderProjectList = (projectsArray, stateManager) => {
  const listContainer = document.getElementById("project-list");

  if (!listContainer) return;

  listContainer.innerHTML = "";

  projectsArray.forEach((project, index) => {
    const projectWrapper = document.createElement("div");
    projectWrapper.className = "project-wrapper";

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
      renderTodos(project);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.className = "del-project-btn";

    delBtn.onclick = (e) => {
      e.stopPropagation();

      // Don't allow deleting the last project if you want to avoid a blank screen
      projectsArray.splice(index, 1);

      if (stateManager.current === project) {
        stateManager.current =
          projectsArray.length > 0 ? projectsArray[0] : null;
      }

      renderProjectList(projectsArray, stateManager);
      renderTodos(stateManager.current);
    };

    projectWrapper.appendChild(projectBtn);
    projectWrapper.appendChild(delBtn);
    listContainer.appendChild(projectWrapper);
  });
};
