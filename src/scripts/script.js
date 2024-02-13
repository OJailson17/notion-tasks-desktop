import { getTasksData } from './getTasks.js';

let getEnvVariables = new Promise(resolve => {
	window.electron.ipcRenderer.on('env-variables', (event, envVariables) => {
		resolve(JSON.parse(envVariables));
	});
});

export const getPage = () => {
	// get pathname
	const pathname = window.location.pathname;
	// get the last part of the path and split it to remove the file extension and get just the name
	const splitPath = pathname.split('/');
	const path = splitPath[splitPath.length - 1].split('.')[0];

	const page = path === 'index' ? 'projects' : path;

	return { page };
};

const { page } = getPage();

getEnvVariables.then(env => {
	getTasksData({ API_URL: env.API_BASE_URL, page });
});
