'use strict';

// get saved  todos
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem('todos');

	// if (todosJSON !== null) {
	// 	return JSON.parse(todosJSON);
	// } else {
	// 	return [];
	// }
	try {
		return todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		return [];
	}
};
//Saved todos
const savedTodos = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};

// remove the todos
const removeTodo = (id) => {
	const todoIndex = todos.findIndex((todo) => todo.id === id);
	if (todoIndex > -1) {
		todos.splice(todoIndex, 1);
	}
};
// check whether the che is checked or not.
const toggleTodo = (id) => {
	const todo = todos.find((todo) => todo.id === id);
	if (todo) {
		todo.isCompleted = !todo.isCompleted;
	}
};
//get dom todo
const generateTodoDom = (todo) => {
	// Elements for the todos
	const todoEl = document.createElement('label');
	const containerEl = document.createElement('div');
	const newTodo = document.createElement('span');
	const checkbox = document.createElement('input');
	const removeButton = document.createElement('button');

	// set attribute for checkbox and appending child
	checkbox.setAttribute('type', 'checkbox');
	checkbox.checked = todo.isCompleted;

	checkbox.addEventListener('change', () => {
		toggleTodo(todo.id);
		savedTodos(todos);
		renderTodos(todos, filters);
	});
	containerEl.appendChild(checkbox);

	// setting the todo data
	// if (todo.text.length > 0) {
	// 	newTodo.textContent = todo.text;
	// } else {
	// 	newTodo.textContent = 'An empty todo';
	// }

	newTodo.textContent = todo.text;
	containerEl.appendChild(newTodo);
	//setup containerEl
	todoEl.classList.add('list-item');
	containerEl.classList.add('list-item__container');
	todoEl.appendChild(containerEl);
	// button textContent
	removeButton.textContent = 'remove';
	removeButton.classList.add('button', 'button--text');
	// remove todo
	removeButton.addEventListener('click', () => {
		removeTodo(todo.id);
		savedTodos(todos);
		renderTodos(todos, filters);
	});
	todoEl.appendChild(removeButton);

	return todoEl;
};

// renderTodos

const renderTodos = (todos, filters) => {
	const todoEl = document.querySelector('#todos');
	const filteredTodos = todos.filter((todo) => {
		const hideCompletedMatch =
			!filters.hideCompleted || !todo.isCompleted;
		const searchTextMatch = todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
		return hideCompletedMatch && searchTextMatch;
	});
	// filteredTodos = filteredTodos.filter(function (todo) {
	// 	// return !filters.hideCompleted || !todo.isCompleted;
	// 	if(filters.hideCompleted){
	// 		return !todo.isCompleted;
	// 	}
	// 	else{
	// 		return true;
	// 	}
	// });
	const incompleteTodos = filteredTodos.filter((todo) => {
		if (todo.text.length > 0) {
			return !todo.isCompleted;
		} else {
			return null;
		}
	});

	todoEl.innerHTML = '';

	todoEl.appendChild(getTodosSummary(incompleteTodos));

	if (filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			// const newTodo = getTodoDom(todo);
			todoEl.appendChild(generateTodoDom(todo));
		});
	} else {
		const messageEl = document.createElement('p');
		messageEl.classList.add('empty-message');
		messageEl.textContent = 'No Todos to show';
		todoEl.appendChild(messageEl);
	}
};
const getTodosSummary = (incompleteTodos) => {
	const summary = document.createElement('h2');
	summary.classList.add('list-title');
	const plural = incompleteTodos.length === 1 ? '' : 's';
	summary.textContent = `you've ${incompleteTodos.length} todo${plural} left`;

	return summary;
};
