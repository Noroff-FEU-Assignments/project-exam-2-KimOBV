import NavLayout from './components/layout/NavLayout';
import UserProfilePage from './components/dashboard/user/UserProfilePage';
import PostDetails from './components/dashboard/posts/PostDetails';
import ProfilesPage from './components/dashboard/profiles/ProfilesPage';
import ProfileDetails from './components/dashboard/profiles/ProfileDetails';
import CreatePost from './components/dashboard/posts/CreatePost';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Login from './components/home/Login';
import NotFound from './components/home/NotFound';
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
					<Row>
						<Col md={3} className="ctr-header">
							<NavLayout />
						</Col>
						<Col md={9} className="ctr-main ">
							<Row>
								<Col md={7} className="ctr-feed">
									<Routes>
										<Route path="/" element={<Login />} />
										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Register />} />
										<Route path="/home" element={<HomeFeed />} />
										<Route path="/explore" element={<PageExplore />} />
										<Route path="/people" element={<ProfilesPage />} />
										<Route path="/posts/:id" exact element={<PostDetails />} />
										<Route path="/user/:name" exact element={<UserProfilePage />} />
										<Route path="/u/:name" exact element={<ProfileDetails />} />
										<Route path="/new-post" element={<CreatePost />} />
										<Route path="*" element={<NotFound />} />
										<Route path="/u/*" element={<NotFound />} />
										<Route path="/user/*" element={<NotFound />} />
									</Routes>
								</Col>
								<Col md={3} responsive="md" className="ctr-sidebar"></Col>
							</Row>
						</Col>
					</Row>
				</PostProvider>
			</AuthProvider>
		</Container>
	);
}

export default App;
