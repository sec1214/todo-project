import "./styles.css";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";
import { createForm } from "./createForm";
import { ProjectFactory } from "./project";
import { renderTodos } from "./renderTodos";
import { renderProjectList } from "./renderProjects";
import { initProjectControls } from "./projectController";
import { hardReset } from "./storage";

// --- DOM ELEMENTS ---
const menuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

// --- DATA INITIALIZATION (RE-HYDRATION) ---
const savedData = loadFromLocalStorage();
let projects;

if (savedData && savedData.length > 0) {
  projects = savedData.map((proj) => ProjectFactory(proj.name, proj.todos));
} else {
  projects = [ProjectFactory("Inbox")];
}

const state = { current: projects[0] };

// --- MOBILE DRAWER LOGIC ---
if (menuBtn && sidebar) {
  // Toggle sidebar visibility
  menuBtn.onclick = (e) => {
    e.stopPropagation(); // Prevents click from bubbling to mainWrapper
    sidebar.classList.toggle("active");
  };

  // Close sidebar when clicking a project or a delete button
  sidebar.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("project-btn") ||
      e.target.classList.contains("del-project-btn")
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Close sidebar when clicking the main content (overlay effect)
  mainWrapper.onclick = () => {
    if (sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  };
}

// --- APP ACTIONS ---

// Reset Button Logic
const resetBtn = document.getElementById("reset-app-btn");
if (resetBtn) {
  resetBtn.onclick = () => {
    if (confirm("Are you sure? This will delete all projects and tasks!")) {
      hardReset();
      // Sidebars should close after a reset on mobile
      sidebar.classList.remove("active");
    }
  };
}

// --- INITIALIZE UI ---

// Setup form and render initial views
createForm(state, projects);
renderProjectList(projects, state);
renderTodos(state.current, projects);

// Initialize controllers for adding/switching projects
initProjectControls(projects, state);
