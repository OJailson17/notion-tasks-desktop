import { checkTask } from './checkTask.js';

let getEnvVariables = new Promise(resolve => {
	window.electron.ipcRenderer.on('env-variables', (event, envVariables) => {
		resolve(JSON.parse(envVariables));
	});
});

getEnvVariables.then(env => {
	getTasksData(env.API_BASE_URL);
});

// The container the will render the whole task list
const taskListContainer = document.querySelector('#tasks-container');

// Render the list of elements
const generateTasksList = ({ listItems, API_URL }) => {
	taskListContainer.innerHTML = '';

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
			checkTask({
				id: event.target.dataset.id,
				isChecked: event.target.checked,
				API_URL,
			})
				.then(async response => {
					console.log({ response });

					// Re-reder the list if the status changes correctly
					if (response.status === 200) {
						console.log({ response });
						await getTasksData(API_URL);
					}
				})
				.catch(err => console.log(err));
		});

		// Create a span element to add the task text value
		const span = document.createElement('span');
		span.innerText = item.title;

		// Create a div to show task status
		const statusElement = document.createElement('div');
		statusElement.setAttribute('class', 'status');

		// Change status div class depending on the status
		switch (item.status) {
			case 'Not Started':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('todo');
				break;
			case 'In progress':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('in-progress');
				break;
			case 'Overdue':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('overdue');
				break;
			default:
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('todo');
		}

		// Append the input, span and div element in the task div container
		taskDiv.appendChild(checkboxInput);
		taskDiv.appendChild(span);
		taskDiv.appendChild(statusElement);

		// Append the task container on the
		taskListContainer?.appendChild(taskDiv);
	});
};

// Render a paragraph to show empty list message
const generateEmptyComponent = () => {
	taskListContainer.innerHTML = `
	<p class="empty-list">No tasks</p>
	`;
};

// Get the tasks data from api
const getTasksData = async API_URL => {
	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			if (data.length <= 0) {
				generateEmptyComponent();
			} else {
				generateTasksList({ listItems: data, API_URL });
			}
		})
		.catch(err => console.log(err));
};
