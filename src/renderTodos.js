import { saveToLocalStorage } from "./storage"; // Import this to persist the checkmark

export const renderTodos = (project, allProjects) => {
  // Pass projects so we can save
  const display = document.getElementById("todo-display");

  if (!project || !project.getTodos) {
    display.innerHTML = "<p>Select a project to see tasks.</p>";
    return;
  }

  display.innerHTML = "";

  project.getTodos().forEach((todo, index) => {
    const card = document.createElement("div");
    // Add a 'completed' class if the data says true
    card.className = `todo-card ${todo.priority.toLowerCase()} ${todo.completed ? "completed" : ""}`;

    const info = document.createElement("div");
    info.className = "todo-info";

    // --- The Checkbox Logic ---
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed; // Sync with data
    checkbox.className = "todo-checkbox";

    checkbox.onclick = () => {
      todo.completed = !todo.completed; // Data-only toggle!
      saveToLocalStorage(allProjects); // Save the change to the browser
      renderTodos(project, allProjects); // Refresh the view
    };

    const title = document.createElement("h3");
    title.textContent = todo.title;

    // ... existing description and date code ...
    const desc = document.createElement("p");
    desc.textContent = todo.description;
    desc.className = "todo-description";

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.textContent = "Delete";

    delBtn.onclick = () => {
      project.removeTodo(index);
      saveToLocalStorage(allProjects); // Save after deleting!
      renderTodos(project, allProjects);
    };

    // Put it all together
    info.append(checkbox, title, desc); // Added checkbox here
    actions.append(delBtn);
    card.append(info, actions);
    display.appendChild(card);
  });
};
