// import { tasks } from '../../data.js';
import { generateEmptyComponent } from './empyComponent.js';
import { generateProjectsTasksList } from './generateProjectTasks.js';

const taskListContainer = document.querySelector('#tasks-container');

// Get the tasks data from api
export const getTasksData = async ({ API_URL, page }) => {
	taskListContainer.innerHTML = '';

	generateEmptyComponent();

	const emptyMessage = document.querySelector('.empty-list p');
	const spinner = document.querySelector('.spin');

	spinner.classList.remove('hidden');

	// generateProjectsTasksList({ listItems: tasks, API_URL });

	fetch(`${API_URL}/${page}`)
		.then(res => res.json())
		.then(data => {
			if (data.length <= 0) {
				emptyMessage.classList.remove('hidden');
			} else {
				generateProjectsTasksList({ listItems: data, API_URL });
			}

			spinner.classList.add('hidden');
		})
		.catch(err => {
			spinner.classList.add('hidden');
			alert('Error');
			console.log(err);
		});
};
