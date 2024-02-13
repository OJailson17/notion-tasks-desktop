const taskListContainer = document.querySelector('#tasks-container');

export const generateEmptyComponent = () => {
	taskListContainer.innerHTML = `
		<div class="empty-list">
			<p class="hidden">No tasks</p>
		</div>
		<div class="spin hidden"></div>
	`;
};
