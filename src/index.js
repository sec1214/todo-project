import './styles.css';
import { createForm } from './createForm';
import { ProjectFactory } from "./project";
import { renderTodos } from "./renderTodos";
import { renderProjectList } from './renderProjects';

const projects = [];
const state = { current : null };

// Initial Setup
const inbox = ProjectFactory('Inbox');
projects.push(inbox);
state.current = inbox;

// Initialize Components
createForm(state);
renderProjectList(projects, state);
renderTodos(state.current);