// 1. IMPORT everything (Ensure paths are correct!)
import './styles.css';
import { createForm } from './createForm';
import { ProjectFactory } from "./project";
import { TodoFactory } from "./todo";
import { renderTodos } from "./renderTodos";
import { renderProjectList } from './renderProjects';

const projects = [];

const state = {
    current : null
}

const inbox = ProjectFactory('inbox');
projects.push(inbox);
state.current = inbox;
createForm(state.current);


renderProjectList(projects, state);
renderTodos(state.current)