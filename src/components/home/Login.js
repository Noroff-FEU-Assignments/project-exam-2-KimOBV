import { Link } from 'react-router-dom';
import LoginForm from '../login/FormLogin';

export default function Login() {
	return (
		<>
			<div className="landing">
				<div className="title">
					<h1 className="logo-h1">Howler</h1>
					<h1>!</h1>
				</div>
				<br />
				<h3>Be loud, get heard!</h3>

				<LoginForm />

				<Link to="/register">Not a user?</Link>
			</div>
		</>
	);
}
