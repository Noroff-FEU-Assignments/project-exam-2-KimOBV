import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';
import useStore from '../../context/PostContext';

const url = BASE_URL + 'auth/login';

const schema = yup.object().shape({
	email: yup.string().required('Please enter your email.').email('Please enter a valid email address.'),
	password: yup.string().required('Please enter your password'),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const { setUserAvatar } = useStore();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [, setAuth] = useContext(AuthContext);

	async function loginSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		const formData = JSON.stringify(data);

		const options = {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(url, options);
			const json = await response.json();
			if (response.ok) {
				setAuth(json);
				setUserAvatar(json.avatar);
				navigate('/home');
				window.location.reload(); //bad, need to make a better solution
			} else {
				setLoginError('wrong username or password');
			}
		} catch (error) {
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(loginSubmit)}>
				{loginError && <ErrorMessage>{loginError}</ErrorMessage>}
				<div>
					<div>
						<label htmlFor="email">Email:</label>
						<input {...register('email')} id="email" />
						{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input {...register('password')} id="password" type="password" />
						{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
					</div>
				</div>
				<button className="btn btn-primary">{submitting ? 'Hold on' : 'Log in'}</button>
			</form>
		</>
	);
}
