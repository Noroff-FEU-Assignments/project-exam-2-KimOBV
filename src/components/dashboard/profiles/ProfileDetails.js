import { Unfollow, Follow } from './Follow';
import Heading from '../../layout/Heading';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { Link, useParams } from 'react-router-dom';
import Banner from '../../common/DefaultBanner';
import Avatar from '../../common/DefaultAvatar';
import PostMedia from '../../common/PostMedia';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../common/LoadingIndicator';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { Dropdown } from 'react-bootstrap';
import UserPosts from '../user/UserPosts';

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

	const postContainer = document.querySelector('.postContainer');

	const showFollowers = () => {
		const followerContainer = document.querySelector('.followers-container');
		followerContainer.classList.toggle('d-none');
		postContainer.classList.toggle('d-none');
	};
	const showFollowing = () => {
		const followerContainer = document.querySelector('.following-container');
		followerContainer.classList.toggle('d-none');
		postContainer.classList.toggle('d-none');
	};

	return (
		<>
			<div className="container post-list-container">
				<Row className="row-post-list">
					<div className="container post-list-container">
						<Banner image={profile.banner} class={'user-profile-banner'} />
						<Avatar image={profile.avatar} class={'user-avatar'} alt={profile.name} />
						<div className="user-info-container d-flex">
							<div className="px-3 flex-grow-1">
								<Heading title={'@' + profile.name} />
								<span className="text-muted">{profile.email}</span>
							</div>
							<div className="d-flex flex-grow-1 justify-content-end gap-2 text-center align-self-end">
								<div onClick={showFollowers} className="follow-feed">
									<span className="d-block count-follow-text">{countFollowers} Followers</span>
								</div>
								<div onClick={showFollowing} className="follow-feed">
									<span className="d-block count-follow-text">{countFollowing} Following</span>
								</div>
								<div>{iFollow ? <Unfollow follow={setFollowers} followers={followers} count={setCountFollowers} /> : <Follow follow={setFollowers} count={setCountFollowers} />}</div>
								<div className="justify-content-end align-self-start">
									<Dropdown />
								</div>
							</div>
						</div>
						<Row className="user-content">
							<div className="d-none posts-container followers-container">
								<button onClick={showFollowers}>X</button>
								<h3 className="text-center">Followers</h3>
								{profile.followers.map((follow) => {
									return (
										<Link to={`/u/${follow.name}`} key={follow.name}>
											<div className="followCard">
												<Avatar image={follow.avatar} class={'following-avatar'} />
												<div>@{follow.name}</div>
											</div>
										</Link>
									);
								})}
							</div>
							<div className="d-none posts-container following-container">
								<button onClick={showFollowing}>X</button>
								<h3 className="text-center">Following</h3>
								{profile.following.map((follow) => {
									console.log(follow.followers);
									console.log(profile.followers);
									return (
										<Link to={`/u/${follow.name}`} key={follow.name}>
											<div className="followCard" style={{ backgroundImage: `url(${follow.Banner})` }}>
												<Avatar image={follow.avatar} class={'following-avatar'} />
												<h4>@{follow.name}</h4>
											</div>
										</Link>
									);
								})}
							</div>
						</Row>
						<UserPosts />
					</div>
				</Row>
			</div>
		</>
	);
}
