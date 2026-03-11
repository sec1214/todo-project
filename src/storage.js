const STORAGE_KEY = "taskmaster_projects";

export const saveToLocalStorage = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const hardReset = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload(); // Re-loads the page to trigger the index.js logic
};
