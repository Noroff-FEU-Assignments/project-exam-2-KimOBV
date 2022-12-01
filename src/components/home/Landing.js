import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BigHeading } from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';
import LoginForm from '../login/LoginForm';

export default function Landing() {
	return (
		<>
			<Col>
				<Container>
					<main className="login-container">
						<Row>
							<div className="login-introduction">
								<BigHeading content="Howler is what's happening and what people are talking about right now." />
								<br></br>
								<BigParagraph content="We believe real change starts with conversation. Here, your voice matters." />
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
