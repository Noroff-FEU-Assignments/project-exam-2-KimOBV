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
import GetHomeFeed from './components/dashboard/following/FeedHome';
import { Row, Col, Container } from 'react-bootstrap';
import PageExplore from './components/dashboard/posts/PageExplore';

function App() {
	return (
		<Container>
			<AuthProvider>
				<PostProvider>
					<Router>
						<Row className="app">
							<Col>
								<NavLayout />
							</Col>
							<Col className="feed" md="auto">
								<Routes>
									<Route path="/" exact element={<Landing />} />
									<Route path="/register" exact element={<Register />} />
									<Route path="/user/:name" element={<UserProfilePage />} />
									<Route path="/home" element={<GetHomeFeed />} />
									<Route path="/explore" element={<PageExplore />} />
									<Route path="/posts/:id" element={<PostDetails />} />
									<Route path="/people" element={<ProfilesPage />} />
									<Route path="/u/:name" element={<ProfileDetails />} />
									<Route path="/new-post" element={<CreatePost />} />
									<Route path="*" element={<Landing />} />
								</Routes>
							</Col>
							<Col></Col>
						</Row>
					</Router>
				</PostProvider>
			</AuthProvider>
		</Container>
	);
}

export default App;
