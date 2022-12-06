import NavLayout from './components/layout/NavLayout';
import UserProfilePage from './components/dashboard/user/UserProfilePage';
import PostDetails from './components/dashboard/posts/PostDetails';
import ProfilesPage from './components/dashboard/profiles/ProfilesPage';
import ProfileDetails from './components/dashboard/profiles/ProfileDetails';
import CreatePost from './components/dashboard/posts/CreatePost';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Landing from './components/home/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/styles.scss';
import Register from './components/home/Register';
import { Col, Container, Row } from 'react-bootstrap';
import PageExplore from './components/dashboard/posts/PageExplore';
import HomeFeed from './components/dashboard/following/PageHome';

function App() {
	return (
		<Container fluid="xl">
			<AuthProvider>
				<PostProvider>
					<Router>
						<Row>
							<Col md={3} className="ctr-header">
								<NavLayout />
							</Col>
							<Col md={9} className="ctr-main ">
								<Row>
									<Col md={7} className="ctr-feed">
										<Routes>
											<Route path="/" exact element={<Landing />} />
											<Route path="/register" exact element={<Register />} />
											<Route path="/home" element={<HomeFeed />} />
											<Route path="/explore" element={<PageExplore />} />
											<Route path="/people" element={<ProfilesPage />} />
											<Route path="/posts/:id" element={<PostDetails />} />
											<Route path="/user/:name" element={<UserProfilePage />} />
											<Route path="/u/:name" element={<ProfileDetails />} />
											<Route path="/new-post" element={<CreatePost />} />
											<Route path="*" element={<HomeFeed />} />
										</Routes>
									</Col>
									<Col md={3} responsive="md" className="ctr-sidebar"></Col>
								</Row>
							</Col>
						</Row>
					</Router>
				</PostProvider>
			</AuthProvider>
		</Container>
	);
}

export default App;
