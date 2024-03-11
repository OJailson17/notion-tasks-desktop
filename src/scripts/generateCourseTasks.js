import { getTasksData } from './getTasks.js';
import { getPage } from './script.js';
import { updateCourseStatus } from './updateCouseStatus.js';

// The container the will render the whole task list
const taskListContainer = document.querySelector('#tasks-container');

// Render the list of elements
export const generateCourseTasksList = ({ listItems, API_URL }) => {
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
			updateCourseStatus({
				id: e.target.dataset.id,
				isChecked: e.target.checked,
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

		const taskContentDiv = document.createElement('div');
		taskContentDiv.setAttribute('class', 'badge-container');

		const topicTextParagraph = document.createElement('p');
		topicTextParagraph.innerText = item.tag;
		topicTextParagraph.style.background = item.tag_color;

		// Create a span element to add the task text value
		const span = document.createElement('span');
		span.innerText = item.title;

		taskContentDiv.appendChild(span);
		taskContentDiv.appendChild(topicTextParagraph);

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
		taskDiv.appendChild(taskContentDiv);
		// taskDiv.appendChild(skipButton);
		taskDiv.appendChild(statusElement);

		// Append the task container on the
		taskListContainer?.appendChild(taskDiv);
	});
};
