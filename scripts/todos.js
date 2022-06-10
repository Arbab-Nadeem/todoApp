'use strict';
const todos = getSavedTodos();
const filters = {
	searchText: '',
	hideCompleted: false,
};

renderTodos(todos, filters);

document.getElementById('search-text').addEventListener('input', (event) => {
	filters.searchText = event.target.value;
	renderTodos(todos, filters);
});
document.getElementById('add-todo').addEventListener('submit', (event) => {
	event.preventDefault();
	let data = event.target.elements.add_todo.value.trim();
	if (data.length > 0) {
		todos.push({
			id: uuidv4(),
			text: data,
			isCompleted: false,
		});
		savedTodos(todos);

		renderTodos(todos, filters);
		event.target.elements.add_todo.value = '';
	}
});
document
	.getElementById('hide-completed')
	.addEventListener('change', (event) => {
		filters.hideCompleted = event.target.checked;
		renderTodos(todos, filters);
	});
