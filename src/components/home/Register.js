import { Container, Col, Row } from 'react-bootstrap';
import RegisterForm from '../login/RegisterForm';
import { BigHeading } from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';
import { Link } from 'react-router-dom';

export default function Register() {
	return (
		<>
			<Container>
				<div className="login-background"></div>
				<main className="login-container">
					<Row>
						<Col md={6} xs={12}>
							<div className="login-introduction">
								<BigHeading content="Content with substance. Find  people and be inspired." />
								<br></br>
								<BigParagraph content="A conscious social media platform, created for a more mindful approach to traditional social medias." />
							</div>
						</Col>
						<Col md={6} xs={12}>
							<RegisterForm />
							<Link to="/Landing">Already a user?</Link>
						</Col>
					</Row>
				</main>
			</Container>
		</>
	);
}
