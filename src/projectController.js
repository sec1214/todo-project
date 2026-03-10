export const initProjectControls = (projects, state) => {
  // 1. Target the correct ID from your HTML
  const showBtn = document.getElementById("show-input-btn");
  const inputGroup = document.getElementById("project-input-group");
  const inputField = document.getElementById("new-project-name");
  const saveBtn = document.getElementById("save-project");
  const cancelBtn = document.getElementById("cancel-project");

  // Safety check: if the HTML isn't there, don't run the code
  if (!showBtn || !inputGroup) return;

  const showInput = () => {
    // We don't need to hide the showBtn (the + icon)
    // because it's at the top, but we definitely show the group
    inputGroup.style.display = "block";
    inputField.focus();
  };

  const hideInput = () => {
    inputField.value = "";
    inputGroup.style.display = "none";
  };

  // 2. Attach the click to the correct button
  showBtn.onclick = showInput;
  cancelBtn.onclick = hideInput;

  saveBtn.onclick = () => {
    const name = inputField.value.trim();
    if (name) {
      const newProject = ProjectFactory(name);
      projects.push(newProject);
      state.current = newProject;

      renderProjectList(projects, state);
      renderTodos(state.current);
      hideInput();
    }
  };

  inputField.onkeydown = (e) => {
    if (e.key === "Enter") saveBtn.click();
    if (e.key === "Escape") hideInput();
  };
};
