import useAxios from '../../../hooks/useAxios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../common/ErrorMessage';
import PropTypes from 'prop-types';
import PostMedia from '../../common/PostMedia';

const schema = yup.object().shape({
	title: yup.string().required(),
	body: yup.string().required(),
	media: yup.string().notRequired(),
});

export default function UpdatePost({ id, title, body, media }) {
	const [error, setError] = useState(null);
	const [message, setMessage] = useState('');

	const [, setimglink] = useState('');

	const handleChange = (event) => {
		setimglink(event.target.value);

		console.log('value is:', event.target.value);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();
	async function updateYourPost(data) {
		try {
			const response = await http.put(`posts/${id}`, data);
			console.log(media);
			if (response.status === 200) {
				console.log(response);
				setMessage('Post updated.');
			}
		} catch (error) {
			console.log(error);
			setError(error.toString());
		}
	}

	return (
		<form id="form-update-post" onSubmit={handleSubmit(updateYourPost)}>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<div>
				<label htmlFor="title">Title:</label>
				<input id="title" {...register('title')} defaultValue={title} />
				{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
			</div>
			<div className="div-body">
				<label htmlFor="message">Message:</label>
				<textarea id="message" {...register('body')} rows={6} defaultValue={body}></textarea>
				{errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
			</div>
			<div>
				<PostMedia image={media} />
			</div>
			<div>
				<label htmlFor="media">Image URL:</label>
				<input id="media" {...register('media')} defaultValue={media} onChange={handleChange} />
				{errors.image && <ErrorMessage>{errors.media.message}</ErrorMessage>}
			</div>
			<button className="cta">Update</button>
			{isSubmitSuccessful && <span className="success">{message}</span>}
		</form>
	);
}

UpdatePost.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	body: PropTypes.string,
};
