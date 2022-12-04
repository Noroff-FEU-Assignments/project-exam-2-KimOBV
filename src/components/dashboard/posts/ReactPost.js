import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import useStore from '../../../context/PostContext';
import ErrorMessage from '../../common/ErrorMessage';
import PostDetails from './PostDetails';

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
				window.location.reload();
			}
		} catch (error) {
			setError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<form id="form-reaction" {...register('emoji')} onSubmit={handleSubmit(submitReaction)}>
				<button type="submit" value="🍌" {...register('symbol')} onClick={(e) => setEmoji('🍌')}>
					🍌
				</button>
				<button type="submit" value="🙈" {...register('symbol')} onClick={(e) => setEmoji('🙈')}>
					🙈
				</button>
				<button type="submit" value="🙉" {...register('symbol')} onClick={(e) => setEmoji('🙉')}>
					🙉
				</button>
				<button type="submit" value="🙊" {...register('symbol')} onClick={(e) => setEmoji('🙊')}>
					🙊
				</button>
				<button type="submit" value="❤️" {...register('symbol')} onClick={(e) => setEmoji('❤️')}>
					❤️
				</button>
			</form>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</>
	);
}
