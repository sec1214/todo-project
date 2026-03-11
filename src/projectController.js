import { ProjectFactory } from "./project";
import { renderProjectList } from "./renderProjects";
import { renderTodos } from "./renderTodos";
import { saveToLocalStorage } from "./storage"; // Added import

export const initProjectControls = (projects, state) => {
  const showBtn = document.getElementById("show-input-btn");
  const inputGroup = document.getElementById("project-input-group");
  const inputField = document.getElementById("new-project-name");
  const saveBtn = document.getElementById("save-project");
  const cancelBtn = document.getElementById("cancel-project");
  const projectListContainer = document.getElementById("project-list"); // Added for navigation

  if (!showBtn || !inputGroup) return;

  const showInput = () => {
    inputGroup.style.display = "block";
    inputField.focus();
  };

  const hideInput = () => {
    inputField.value = "";
    inputGroup.style.display = "none";
  };

  showBtn.onclick = showInput;
  cancelBtn.onclick = hideInput;

  saveBtn.onclick = () => {
    const name = inputField.value.trim();
    if (name) {
      const newProject = ProjectFactory(name);
      projects.push(newProject);

      // Save the change to the browser memory!
      saveToLocalStorage(projects);

      state.current = newProject;

      renderProjectList(projects, state);
      // Pass 'projects' as the 2nd argument!
      renderTodos(state.current, projects);
      hideInput();
    }
  };

  // --- NEW: Navigation Logic ---
  // This allows you to click projects in the sidebar to switch views
  projectListContainer.onclick = (e) => {
    const item = e.target.closest("li");
    if (!item) return;

    const index = item.dataset.index;
    state.current = projects[index];

    renderProjectList(projects, state);
    renderTodos(state.current, projects);
  };

  inputField.onkeydown = (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") hideInput();
  };
};
