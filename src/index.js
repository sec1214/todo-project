import "./styles.css";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";
import { createForm } from "./createForm";
import { ProjectFactory } from "./project";
import { renderTodos } from "./renderTodos";
import { renderProjectList } from "./renderProjects";
import { initProjectControls } from "./projectController";
import { hardReset } from "./storage";

// 1. Attempt to grab data from the browser's memory
const savedData = loadFromLocalStorage();

// 2. Initialize the projects array
let projects;

// RE-HYDRATION
if (savedData && savedData.length > 0) {
  // We turn saved projects back into objects with methods (addTodo, etc.)
  // The ProjectFactory handles the todo array automatically.
  projects = savedData.map((proj) => ProjectFactory(proj.name, proj.todos));
} else {
  // FALLBACK: If first time visiting, start with a fresh Inbox
  projects = [ProjectFactory("Inbox")];
}

// 3. Set the initial state (tracking which project is active)
const state = { current: projects[0] };

//reset button
document.getElementById("reset-app-btn").onclick = () => {
  if (confirm("Are you sure? This will delete all projects and tasks!")) {
    hardReset();
  }
};

// --- Initialize UI Components ---

// Setup the Todo input form
// UPDATED: Now passes 'projects' so the form can trigger saveToLocalStorage
createForm(state, projects);

// Draw the initial list of projects in the sidebar
renderProjectList(projects, state);

// Draw the initial todos
// Passing 'projects' allows checkboxes/deletes to persist changes
renderTodos(state.current, projects);

// Attach listeners for adding projects and switching between them
initProjectControls(projects, state);
