import { Link } from 'react-router-dom';
import RegisterForm from '../login/FormRegister';

export default function Register() {
	return (
		<>
			<div className="landing">
				<h3>Content with substance. Find people and be inspired.</h3>
				<br />
				<p>A conscious social media platform, created for a more mindful approach to traditional social medias.</p>

				<RegisterForm />

				<Link to="/login">Already a user?</Link>
			</div>
		</>
	);
}
