export const updateStudyStatus = async ({
	id,
	status = 'Not Started',
	API_URL,
}) => {
	return fetch(`${API_URL}/study/status/update/${id}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ status }),
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
