import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Unfollow } from './Follow';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import Banner from '../../common/BannerMissing';
import Avatar from '../../common/AvatarMissing';
import Loading from '../../common/Loading';
import UserPosts from '../user/UserPosts';

export default function ProfileDetails() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [countFollowers, setCountFollowers] = useState(0);
	const [, setFollowing] = useState([]);
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

	const Following = followers.map((follow) => {
		return follow.name;
	});

	const Follow = Following.includes(auth.name);

	const postContainer = document.querySelector('.postContainer');

	const QtyFollowers = () => {
		const followerContainer = document.querySelector('.followers-container');
		followerContainer.classList.toggle('d-none');
		postContainer.classList.toggle('d-none');
	};
	const QtyFollowing = () => {
		const followerContainer = document.querySelector('.following-container');
		followerContainer.classList.toggle('d-none');
		postContainer.classList.toggle('d-none');
	};

	return (
		<>
			<div className="ctr-profile">
				<div key={profile.id} className="container-people">
					<Banner image={profile.banner} class={'people-banner'} />
					<div className="people-info">
						<div className="people-info-left">
							<Avatar image={profile.avatar} class={'people-avatar'} alt={profile.name} />
						</div>
						<div className="people-info-right">
							<div className="people-info-top">
								<h3>{'@' + profile.name}</h3>
								<p className="text-muted">{profile.email}</p>
							</div>
							<div className="people-info-bottom">
								<p onClick={QtyFollowing}>Following {countFollowing}</p>
								<p onClick={QtyFollowers}>Followers {countFollowers}</p>
								<div>{Follow ? <Unfollow follow={setFollowers} followers={followers} count={setCountFollowers} /> : <Follow follow={setFollowers} count={setCountFollowers} />}</div>
							</div>
						</div>
					</div>
				</div>

				<div className="user-content">
					<div className="d-none posts-container followers-container">
						<button onClick={QtyFollowers}>X</button>
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
						<button onClick={QtyFollowing}>X</button>
						<h3 className="text-center">Following</h3>
						{profile.following.map((follow) => {
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
				</div>
				<UserPosts />
			</div>
		</>
	);
}
