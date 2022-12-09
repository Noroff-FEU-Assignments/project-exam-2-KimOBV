import { Link } from 'react-router-dom';
import RegisterForm from '../login/FormRegister';

export default function Register() {
	return (
		<>
			<div className="landing register">
				<div className="title">
					<h1 className="logo-h1">Howler</h1>
					<h1>!</h1>
				</div>
				<br />
				<h3>Be loud, get heard!</h3>
				<br />
				<p className="reginfo">Register for Howler! with your "@stud.noroff.no" or "@noroff.no" email adress</p>
				<RegisterForm />

				<Link to="/login">Already a user?</Link>
			</div>
		</>
	);
}
