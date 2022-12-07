import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../login/FormLogin';

export default function Login() {
	return (
		<>
			<Col>
				<Container>
					<main className="login-container">
						<Row>
							<div className="login-introduction">
								<h1>Howler is what's happening and what people are talking about right now. </h1>
								<br></br>
								<h3>We believe real change starts with conversation. Here, your voice matters.</h3>
							</div>
							<div>
								<LoginForm />
								<Link to="/register">Not a user?</Link>
							</div>
						</Row>
					</main>
				</Container>
			</Col>
		</>
	);
}
