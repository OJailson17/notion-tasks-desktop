import { generateEmptyComponent } from './empyComponent.js';
import { generateLanguageTasksList } from './generateLanguageTasks.js';
import { generateProjectsTasksList } from './generateProjectTasks.js';
import { generateStudyTasksList } from './generateStudyTasks.js';

const taskListContainer = document.querySelector('#tasks-container');

// Get the tasks data from api
export const getTasksData = async ({ API_URL, page }) => {
	taskListContainer.innerHTML = '';

	generateEmptyComponent();

	const emptyMessage = document.querySelector('.empty-list p');
	const spinner = document.querySelector('.spin');

	spinner.classList.remove('hidden');

	const getTasksList = ({ page = 'projects', items }) => {
		if (page === 'languages') {
			generateLanguageTasksList({
				listItems: items,
				API_URL,
			});
		} else if (page === 'study') {
			generateStudyTasksList({
				listItems: items,
				API_URL,
			});
		} else {
			generateProjectsTasksList({
				listItems: items,
				API_URL,
			});
		}
	};

	fetch(`${API_URL}/${page}`)
		.then(res => res.json())
		.then(data => {
			if (data.length <= 0) {
				emptyMessage.classList.remove('hidden');
			} else {
				getTasksList({ page, items: data });
			}

			spinner.classList.add('hidden');
		})
		.catch(err => {
			spinner.classList.add('hidden');
			alert('Error');
			console.log(err);
		});
};
