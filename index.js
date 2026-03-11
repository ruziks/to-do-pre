let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const storedTasks = localStorage.getItem("tasks");
	if(storedTasks) {
		return JSON.parse(storedTasks)
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

	const textElement = clone.querySelector(".to-do__item-text");
	let originalText = "";
	textElement.addEventListener('focus', function(event) {
		originalText = textElement.textContent;
	});

	textElement.addEventListener('blur', function(event) {
		textElement.setAttribute("contenteditable", "false");
		if(textElement.textContent.trim()) {
			const items = getTasksFromDOM();
			saveTasks(items);
		}
		else {
			textElement.textContent = originalText;
		}
	});
	
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener("click", function(event) {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener("click", function(event) {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener("click", function(event) {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.textContent = item;

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
	let tasks = [];
	itemsNamesElements.forEach(function (item) {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", function(event) {
	event.preventDefault();
	if(inputElement.value.trim()) {
		listElement.prepend(createItem(inputElement.value));
		const items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = "";
	}
});

items = loadTasks();

items.forEach(function (item) {
	listElement.append(createItem(item));
});
