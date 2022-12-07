import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../login/FormRegister';

export default function Register() {
	return (
		<>
			<Container>
				<div className="login-background"></div>
				<main className="login-container">
					<Row>
						<Col md={6} xs={12}>
							<div className="login-introduction">
								<h1>Content with substance. Find people and be inspired.</h1>
								<br></br>
								<h1>A conscious social media platform, created for a more mindful approach to traditional social medias.</h1>
							</div>
						</Col>
						<Col md={6} xs={12}>
							<RegisterForm />
							<Link to="/">Already a user?</Link>
						</Col>
					</Row>
				</main>
			</Container>
		</>
	);
}
