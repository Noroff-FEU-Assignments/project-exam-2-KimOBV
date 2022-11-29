import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BigHeading } from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';
import LoginForm from '../login/LoginForm';

export default function Landing() {
	return (
		<>
			<Container>
				<div className="login-background"></div>
				<main className="login-container">
					<Row>
						<Col lg={6} md={12}>
							<div className="login-introduction">
								<BigHeading content="Content with substance. Find  people and be inspired." />
								<br></br>
								<BigParagraph content="A conscious social media platform, created for a more mindful approach to traditional social medias." />
							</div>
						</Col>
						<Col lg={6} md={12}>
							<LoginForm />
							<Link to="/register">Not a user?</Link>
						</Col>
					</Row>
				</main>
			</Container>
		</>
	);
}
