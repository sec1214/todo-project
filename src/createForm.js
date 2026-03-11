import { TodoFactory } from "./todo";
import { renderTodos } from "./renderTodos";
import { saveToLocalStorage } from "./storage";

/**
 * @param {Object} state - The application state containing 'current' project.
 * @param {Array} projects - The master list of all projects (needed for saving).
 */
export const createForm = (state, projects) => {
  const anchor = document.getElementById("form-anchor");

  // Create Form Container
  const form = document.createElement("form");
  form.className = "todo-form-container";

  // Title Input
  const title = Object.assign(document.createElement("input"), {
    placeholder: "Title",
    required: true,
    className: "form-input",
  });

  // Description Input
  const desc = Object.assign(document.createElement("input"), {
    placeholder: "Description",
    className: "form-input",
  });

  // Date Input
  const date = Object.assign(document.createElement("input"), {
    type: "date",
    className: "form-date",
  });

  // Priority Selector
  const priority = document.createElement("select");
  priority.className = "form-select";
  ["high", "medium", "low"].forEach((lvl) => {
    priority.add(new Option(lvl.charAt(0).toUpperCase() + lvl.slice(1), lvl));
  });

  // Submit Button
  const btn = Object.assign(document.createElement("button"), {
    textContent: "Add Task",
    type: "submit",
    className: "submit-btn",
  });

  // Assemble Form
  form.append(title, desc, date, priority, btn);
  anchor.appendChild(form);

  // Form Logic
  form.onsubmit = (e) => {
    e.preventDefault();

    // 1. Create the new Todo data object
    const todo = TodoFactory(
      title.value,
      desc.value,
      date.value,
      priority.value,
    );

    // 2. Add the todo to the project currently in view
    state.current.addTodo(todo);

    // 3. PERSISTENCE: Save the entire projects array to LocalStorage
    // This ensures the new todo survives a page refresh.
    saveToLocalStorage(projects);

    // 4. Update the UI
    // We pass 'projects' here so the newly rendered todo has access
    // to the save logic via its checkbox/delete buttons.
    renderTodos(state.current, projects);

    // 5. Cleanup
    form.reset();
  };
};
