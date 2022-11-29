import NavLayout from './components/layout/NavLayout';
import UserProfilePage from './components/dashboard/user/UserProfilePage';
import Explore from './components/dashboard/posts/PostPage';
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
import Feed from './components/dashboard/following/FollowingPage';

function App() {
	return (
		<div className="app">
			<AuthProvider>
				<PostProvider>
					<Router>
						<NavLayout />
						<Routes>
							<Route path="/" exact element={<Landing />} />
							<Route path="/register" exact element={<Register />} />
							<Route path="/user/:name" element={<UserProfilePage />} />
							<Route path="/feed" element={<Feed />} />
							<Route path="/explore" element={<Explore />} />
							<Route path="/posts/:id" element={<PostDetails />} />
							<Route path="/people" element={<ProfilesPage />} />
							<Route path="/u/:name" element={<ProfileDetails />} />
							<Route path="/new-post" element={<CreatePost />} />
							<Route path="*" element={<Landing />} />
						</Routes>
					</Router>
				</PostProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
