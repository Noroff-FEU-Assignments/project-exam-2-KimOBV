import { useParams } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import PropTypes from 'prop-types';

export function Follow({ follow, count }) {
	let { name } = useParams();

	const http = useAxios();

	async function submitFollow() {
		try {
			const response = await http.put(`profiles/${name}/follow`);
			if (response.status === 200) {
				console.log(response);
				follow((curr) => [...curr, response.data]);
				count((curr) => curr + 1);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return <button onClick={submitFollow} className="follow-btn"></button>;
}

Follow.propTypes = {
	follow: PropTypes.func.isRequired,
	count: PropTypes.func.isRequired,
};

export function Unfollow({ follow, count, followers }) {
	let { name } = useParams();

	const http = useAxios();

	function unFollow(name) {
		const newFollowers = followers.filter((f) => f.name !== name);
		console.log(newFollowers);
		follow(newFollowers);
	}

	async function submitUnfollow() {
		try {
			const response = await http.put(`profiles/${name}/unfollow`);
			console.log(response);
			if (response.status === 200) {
				unFollow(response.data.name);
				count((curr) => curr - 1);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return <button onClick={submitUnfollow} className="unfollow-btn"></button>;
}

Unfollow.propTypes = {
	follow: PropTypes.func.isRequired,
	count: PropTypes.func.isRequired,
	followers: PropTypes.array.isRequired,
};
