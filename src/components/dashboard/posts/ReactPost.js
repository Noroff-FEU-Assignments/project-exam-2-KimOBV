import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import useStore from '../../../context/PostContext';
import ErrorMessage from '../../common/ErrorMessage';

const schema = yup.object().shape({
	symbol: yup.string().required('Please select a symbol'),
});

export default function ReactPost() {
	let { id } = useParams();
	const [, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const [emoji, setEmoji] = useState();
	const { addReaction } = useStore();

	const { register, reset, handleSubmit } = useForm({ resolver: yupResolver(schema) });

	const http = useAxios();

	let symbol = emoji;

	async function submitReaction() {
		reset();
		try {
			const response = await http.put(`posts/${id}/react/${symbol}`);
			console.log('response', response);
			if (response.status === 200 || response.status === 201) {
				addReaction(response.data);
			}
		} catch (error) {
			setError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(submitReaction)} className="react-form">
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<select value={emoji} {...register('symbol')} onChange={(e) => setEmoji(e.target.value)} className="react-select w-100">
				<option value="">Select an emoji</option>
				<option>🐵</option>
				<option>🙈</option>
				<option>🙉</option>
				<option>🙊</option>
				<option>🍌</option>
				<option>❤️</option>
			</select>
			<button className="cta">React</button>
		</form>
	);
}
