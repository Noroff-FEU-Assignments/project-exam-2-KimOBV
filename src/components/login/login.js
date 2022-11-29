import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = BASE_URL + 'auth/login';

const schema = yup.object().shape({
	email: yup.string().required('Please enter your email.').email('Please enter a valid email address.'),
	password: yup.string().required('Please enter your password'),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// eslint-disable-next-line
	const [, setAuth] = useContext(AuthContext);

	async function loginSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		const formData = JSON.stringify(data);
		console.log(formData);

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
				navigate('/posts');
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
			<Form onSubmit={handleSubmit(loginSubmit)}>
				{loginError && <ErrorMessage>{loginError}</ErrorMessage>}
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control {...register('email')} type="email" placeholder="Enter email" />
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control {...register('password')} type="password" placeholder="Password" />
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<form onSubmit={handleSubmit(loginSubmit)}>
				{loginError && <ErrorMessage>{loginError}</ErrorMessage>}
				<div>
					<div class="mb-3">
						<label htmlFor="email" class="form-label">
							Email:
						</label>
						<input {...register('email')} id="email" />
						{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input {...register('password')} id="password" type="password" />
						{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
					</div>
				</div>
				<button className="cta">{submitting ? 'Hold on' : 'Log in'}</button>
			</form>
		</>
	);
}
