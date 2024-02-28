export const updateCourseStatus = async ({ id, isChecked, API_URL }) => {
	return fetch(`${API_URL}/course/status/update/${id}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ isChecked }),
	})
		.then(res => res.json())
		.then(data => {
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
