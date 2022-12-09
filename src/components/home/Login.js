import { Link } from 'react-router-dom';
import LoginForm from '../login/FormLogin';

export default function Login() {
	return (
		<>
			<div>
				<div className="landing">
					<h3>Howler is what's happening and what people are talking about right now.</h3>
					<br />
					<p>We believe real change starts with conversation. Here, your voice matters.</p>

					<LoginForm />

					<Link to="/register">Not a user?</Link>
				</div>
			</div>
		</>
	);
}
