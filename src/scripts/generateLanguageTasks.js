import { getTasksData } from './getTasks.js';
import { getPage } from './script.js';
import { updateLanguageStatus } from './updateLanguageStatus.js';
import { updateProjectStatus } from './updateProjectStatus.js';

// The container the will render the whole task list
const taskListContainer = document.querySelector('#tasks-container');

// Render the list of elements
export const generateLanguageTasksList = ({ listItems, API_URL }) => {
	// Create li on the ul element with the task title
	listItems.forEach(item => {
		// Create task element
		const taskDiv = document.createElement('div');
		taskDiv.setAttribute('class', 'task');

		const isInputChecked = item.status === 'Done';

		// Create a checkbox input and set atributes to it
		const checkboxInput = document.createElement('input');
		checkboxInput.setAttribute('type', 'checkbox');
		checkboxInput.setAttribute('id', 'taskCheck');
		checkboxInput.setAttribute('name', 'isDone');
		checkboxInput.setAttribute('data-id', item.id);

		// Mark input as checked if task status is 'Done'
		checkboxInput.checked = isInputChecked;

		// Add a event listener to verify if input is checked
		checkboxInput.addEventListener('change', async e => {
			// Call function to change task status on Notion
			let status = 'Not Started';

			if (e.target.checked) {
				status = 'Done';
			}

			updateLanguageStatus({
				id: e.target.dataset.id,
				status,
				API_URL,
			})
				.then(async response => {
					const { page } = getPage();

					// Re-reder the list if the status changes correctly
					if (response.status === 200) {
						console.log({ response });
						await getTasksData({ API_URL, page });
					}
				})
				.catch(err => console.log(err));
		});

		// Create a span element to add the task text value
		const span = document.createElement('span');
		span.innerText = item.title;

		// Skip task button
		const skipButton = document.createElement('button');
		const skipButtonIcon = document.createElement('img');
		skipButtonIcon.setAttribute('src', '../assets/skip-icon.svg');
		skipButton.setAttribute('class', 'skip-button');
		skipButton.setAttribute('data-id', item.id);
		skipButton.appendChild(skipButtonIcon);

		skipButton.addEventListener('click', event => {
			updateLanguageStatus({
				id: event.target.dataset.id,
				status: 'Skipped',
				API_URL,
			})
				.then(async response => {
					const { page } = getPage();

					// Re-reder the list if the status changes correctly
					if (response.status === 200) {
						console.log({ response });
						await getTasksData({ API_URL, page });
					}
				})
				.catch(err => console.log(err));
		});

		// Create a div to show task status
		const statusElement = document.createElement('div');
		statusElement.setAttribute('class', 'status');

		// Change status div class depending on the status
		if (item.status === 'In progress') {
			statusElement.classList.remove('in-progress', 'overdue', 'todo');
			statusElement.classList.add('in-progress');
		} else {
			statusElement.classList.remove('in-progress', 'skipped', 'todo');
			statusElement.classList.add('todo');
		}

		item.date = item.date.replaceAll('-', '/');

		// add a today badge if task is from today
		const isFromToday =
			new Date().toLocaleDateString('pt-BR', {
				timeZone: 'America/Sao_Paulo',
			}) ===
			new Date(item.date).toLocaleDateString('pt-BR', {
				timeZone: 'America/Sao_Paulo',
			});

		if (isFromToday) {
			const todayBadge = document.createElement('p');
			todayBadge.innerText = 'today';
			todayBadge.setAttribute('class', 'today-badge');

			taskDiv.appendChild(todayBadge);
		}

		// Append the input, span and div element in the task div container
		taskDiv.insertBefore(checkboxInput, taskDiv.childNodes[0]);
		taskDiv.insertBefore(span, taskDiv.childNodes[1]);
		taskDiv.appendChild(skipButton);
		taskDiv.appendChild(statusElement);

		// Append the task container on the
		taskListContainer?.appendChild(taskDiv);
	});
};
