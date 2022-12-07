import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../common/ErrorMessage';
import useAxios from '../../../hooks/useAxios';
import useStore from '../../../context/PostContext';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Accordion, Button, Card, useAccordionButton } from 'react-bootstrap';
import Avatar from '../../common/AvatarMissing';
import PostMedia from '../../common/PostMedia';

const user = JSON.parse(localStorage.getItem('auth'));

const schema = yup.object().shape({
	title: yup.string().required('Please enter a title'),
	body: yup.string().required('Please enter your message'),
	image: yup.string().notRequired('Please an image url'),
});

export default function CreatePost() {
	const [, setSubmitting] = useState(false);
	const [postError, setPostError] = useState(null);
	const [message, setMessage] = useState('');
	const { addPost } = useStore();
	const [characterCount, setCharacterCount] = useState(0);

	//console.log('posts', state);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

	const [imglink, setimglink] = useState('');

	const handleChange = (event) => {
		setimglink(event.target.value);

		console.log('value is:', event.target.value);
	};

	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'));

		return (
			<button type="button" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={decoratedOnClick}>
				{children}
			</button>
		);
	}

	async function postComment(data) {
		setSubmitting(true);
		setPostError(null);
		setMessage('Post submitted');

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
				reset();
				CreatePost.reset();
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
			<div className="container-post">
				<div className="post-left">
					<Avatar image={user.avatar} class={'post-avatar'} alt={user.name} />
				</div>
				<div className="post-right">
					<form onSubmit={handleSubmit(postComment)}>
						{postError && <ErrorMessage>{postError}</ErrorMessage>}
						<div>
							<input type="text" id="title" placeholder="Title" {...register('title')} />
							{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
						</div>
						<div>
							<textarea id="style-2" className="scrollbar" placeholder="What's up?" {...register('body')} rows={6} maxLength={280} onChange={(e) => setCharacterCount(e.target.value.length)}></textarea>
							{errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
						</div>
						<PostMedia image={imglink} />
						<div>
							<Accordion defaultActiveKey="0" flush>
								<Card>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<input type="media" id="input-image" placeholder="https://imageURLGoesHere.com/gif" {...register('image')} onChange={handleChange} value={imglink} />
											{errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
										</Card.Body>
									</Accordion.Collapse>
									<Card.Header>
										<div className="form-ctrl-l">
											<CustomToggle eventKey="1">
												<PhotoIcon />
											</CustomToggle>
										</div>
										<div className="form-ctrl-r">
											<span className="msg-length">{characterCount}/280</span>
											<Button className="btn btn-primary" id="form-post-btn" type="submit">
												Post
											</Button>
										</div>
									</Card.Header>
								</Card>
							</Accordion>
						</div>
						{isSubmitSuccessful && <span className="success">{message}</span>}
						<br />
					</form>
				</div>
			</div>
		</>
	);
}
