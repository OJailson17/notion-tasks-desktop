export const checkTask = async (id, isChecked) => {
	return fetch(
		`https://notion-tasks-extension-server.vercel.app/status/update/${id}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ isChecked }),
		},
	)
		.then(res => res.json())
		.then(data => {
			console.log({ data });
			return {
				status: 200,
				data,
			};
		})
		.catch(err => {
			console.log(err);
			return null;
		});
};
