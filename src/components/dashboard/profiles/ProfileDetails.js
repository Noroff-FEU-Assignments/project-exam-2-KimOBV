import { Unfollow, Follow } from './Follow';
import Heading from '../../layout/Heading';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import Banner from '../../common/DefaultBanner';
import Avatar from '../../common/DefaultAvatar';
import PostMedia from '../../common/PostMedia';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../common/LoadingIndicator';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function ProfileDetails() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [countFollowers, setCountFollowers] = useState(0);
	const [following, setFollowing] = useState([]);
	const [countFollowing, setCountFollowing] = useState(0);
	const [auth] = useLocalStorage('auth');

	let { name } = useParams();

	const http = useAxios();

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
				if (response.status === 200) {
					setProfile(response.data);
					setFollowers(response.data.followers);
					setCountFollowers(response.data._count.followers);
					setFollowing(response.data.following);
					setCountFollowing(response.data._count.following);
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getProfile();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage>{error}</ErrorMessage>;
	}

	const isFollowing = followers.map((follow) => {
		return follow.name;
	});

	const iFollow = isFollowing.includes(auth.name);

	return (
		<>
			<div className="user-profile-container">
				<Banner image={profile.banner} class={'user-profile-banner'} />
				<Avatar image={profile.avatar} class={'user-avatar'} alt={profile.name} />
				<div className="user-info-container d-flex">
					<div className="px-3 flex-grow-1">
						<Heading title={'@' + profile.name} />
						<span className="text-muted">{profile.email}</span>
					</div>
					<div className="d-flex flex-grow-1 justify-content-center gap-4 text-center align-self-center">
						<div onClick={countFollowing} className="follow-feed">
							<span className="d-block count-follow-text">{countFollowers} Followers</span>
						</div>
						<div onClick={countFollowing} className="follow-feed">
							<span className="d-block count-follow-text">{countFollowing} Following</span>
						</div>
						<div>
							<div>{iFollow ? <Unfollow follow={setFollowers} followers={followers} count={setCountFollowers} /> : <Follow follow={setFollowers} count={setCountFollowers} />}</div>
						</div>
					</div>
				</div>
				<Row className="user-content">
					<Col className="d-none posts-container followers-container">
						<h3 className="text-center">Followers</h3>
						{profile.followers.map((follow) => {
							return (
								<Link to={`/profile/${follow.name}`} key={follow.name}>
									<Avatar image={follow.avatar} class={'following-avatar'} />
									<div>{follow.name}</div>
								</Link>
							);
						})}
					</Col>
					<Col className="d-none posts-container following-container">
						<h3 className="text-center">Following</h3>
						{profile.following.map((follow) => {
							return (
								<Link to={`/profile/${follow.name}`} key={follow.name}>
									<Avatar image={follow.avatar} class={'following-avatar'} />
									<div>{follow.name}</div>
								</Link>
							);
						})}
					</Col>
					<Col>
						{profile.posts.map((post, index) => {
							return (
								<div key={index}>
									<div className="posts-container">
										<h2>{post.title}</h2>
										<PostMedia image={post.media} />
										<p>{post.body}</p>
										<span>{post.created}</span>
									</div>
								</div>
							);
						})}
					</Col>
				</Row>
			</div>
		</>
	);
}
