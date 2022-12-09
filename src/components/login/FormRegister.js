import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../const/api';
import ErrorMessage from '../common/ErrorMessage';

const nameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
	name: yup.string().required('Please enter your name').matches(nameRegex, 'No punctuation symbols except underscore (_)'),
	email: yup.string().required('Please enter your email.').email().matches(emailRegex, 'must be a stud.noroff.no or noroff.no email address.'),
	password: yup.string().required('Please enter your password').min(8, 'Password must be atleast 8 characters.'),
	avatar: yup.string(),
	banner: yup.string(),
});

export default function RegisterForm() {
	const [, setSubmitting] = useState(false);
	const [registerError, setRegisterError] = useState(null);
	const [, setMessage] = useState('');

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const url = URL + 'auth/register';

	async function registerSubmit(data) {
		setSubmitting(true);
		setRegisterError(null);
		console.log(data);

		const formData = JSON.stringify(data);

		const options = {
			method: 'POST',
			body: formData,
			headers: { 'Content-Type': 'application/json' },
		};

		try {
			const response = await fetch(url, options);
			const json = await response.json();
			console.log(json);
			if (response.ok) {
				navigate('/login');
				setMessage('Account created');
			} else {
				setRegisterError('Account already exists');
			}
		} catch (error) {
			console.log('error', error);
			setRegisterError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(registerSubmit)}>
			{registerError && <ErrorMessage>{registerError}</ErrorMessage>}
			<div>
				<label htmlFor="name">
					Name:<span className="required">*</span>
				</label>
				<input id="name" {...register('name')} />
				{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
			</div>
			<div>
				<label htmlFor="email">
					Email:<span className="required">*</span>
				</label>
				<input id="email" {...register('email')} />
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
			</div>
			<div>
				<label htmlFor="password">
					Password:<span className="required">*</span>
				</label>
				<input id="password" {...register('password')} type="password" />
				{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
			</div>
			<div>
				<label htmlFor="avatar">
					Avatar:<span className="optional"> (optional)</span>
				</label>
				<input id="avatar" {...register('avatar')} />
				{errors.avatar && <ErrorMessage>{errors.avatar.message}</ErrorMessage>}
			</div>
			<div>
				<label htmlFor="banner">
					Banner:<span className="optional"> (optional)</span>
				</label>
				<input id="banner" {...register('banner')} />
				{errors.banner && <ErrorMessage>{errors.banner.message}</ErrorMessage>}
			</div>
			<button className="btn btn-primary">Register</button>
		</form>
	);
}
