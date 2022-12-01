import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../common/ErrorMessage';
import useAxios from '../../../hooks/useAxios';
import useStore from '../../../context/PostContext';
import ModalVertical from '../../common/ModalVertical';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Button } from 'react-bootstrap';
import Avatar from '../../common/DefaultAvatar';
import userEvent from '@testing-library/user-event';

const schema = yup.object().shape({
	title: yup.string().required('Please enter a title'),
	body: yup.string().required('Please enter your message'),
	image: yup.string().notRequired('Please an image url'),
});

export default function CreatePost() {
	const [, setSubmitting] = useState(false);
	const [postError, setPostError] = useState(null);
	const [message, setMessage] = useState('');
	const { state, addPost } = useStore();
	const [characterCount, setCharacterCount] = useState(0);
	document.title = 'Howler | New Post';

	console.log('posts', state);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

	const [modalShowBanner, setModalShowUpdate] = useState(false);

	async function postComment(data) {
		setSubmitting(true);
		setPostError(null);
		setMessage('Post submitted');
		reset();

		const title = data.title;
		const message = data.body;
		const image = data.image;

		const formData = {
			title: title,
			body: message,
			media: image,
		};

		try {
			const response = await http.post(`posts`, JSON.stringify(formData));
			console.log(response.data);
			if (response.status === 200 || response.status === 201) {
				addPost(response.data);
			}
		} catch (error) {
			console.log('error', error);
			setPostError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit(postComment)} className="mt-3">
				{postError && <ErrorMessage>{postError}</ErrorMessage>}
				<div>
					<input type="text" id="title" placeholder="Title" {...register('title')} />
					{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</div>
				<div>
					<textarea id="style-2" className="scrollbar" placeholder="What's up?" {...register('body')} rows={5} maxLength={280} onChange={(e) => setCharacterCount(e.target.value.length)}></textarea>
					{errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
				</div>
				<div className="form-add">
					<PhotoIcon className="add-image" onClick={() => setModalShowUpdate(true)} />
					<Button type="submit" className="cta-secondary post-btn">
						Post
					</Button>
					<ModalVertical show={modalShowBanner} onHide={() => setModalShowUpdate(false)} heading="Add an URL to an image or a gif">
						<input id="media" placeholder="https://imageURLGoesHere.com/gif" {...register('image')} />
						<Button className="cta-secondary" onClick={() => setModalShowUpdate(false)}>
							Add to post
						</Button>
						{errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
					</ModalVertical>
				</div>
				{isSubmitSuccessful && <span className="success">{message}</span>}
				<br />
			</form>
		</>
	);
}
