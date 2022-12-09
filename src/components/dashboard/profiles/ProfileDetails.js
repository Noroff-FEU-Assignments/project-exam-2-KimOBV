import React, { useState, useEffect } from 'react';
import { Link, redirect, useParams } from 'react-router-dom';
import { Follow, Unfollow } from './Follow';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import Banner from '../../common/BannerMissing';
import Avatar from '../../common/AvatarMissing';
import Loading from '../../common/Loading';
import UserPosts from '../posts/UserPosts';
import { OverlayTrigger, Popover } from 'react-bootstrap';

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
		return <ErrorMessage />;
	}

	const Following = followers.map((follow) => {
		return follow.name;
	});

	const followCheck = Following.includes(auth.name);

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
								<OverlayTrigger
									className="view-foll"
									trigger="click"
									placement="bottom"
									rootClose="true"
									overlay={
										<Popover id={`popover-view-foll`}>
											<Popover.Body>
												{profile.following.map((following) => {
													console.log(auth.name, name);
													return (
														<>
															{auth.name !== following.name ? (
																<Link className="user-card-sm" to={`/u/${following.name}`} onClick={redirect(`/u/${following.name}`)} key={following.name}>
																	<div className="user-card-l">
																		<Avatar image={following.avatar} class={'avatar-card'} />
																	</div>
																	<div className="user-card-r">
																		<h5>@{following.name}</h5>
																	</div>
																</Link>
															) : (
																<Link className="user-card-sm" to={`/user/${following.name}`} onClick={redirect(`/user/${following.name}`)} key={following.name}>
																	<div className="user-card-l">
																		<Avatar image={following.avatar} class={'avatar-card'} />
																	</div>
																	<div className="user-card-r">
																		<h5>@{following.name}</h5>
																	</div>
																</Link>
															)}
														</>
													);
												})}
											</Popover.Body>
										</Popover>
									}
								>
									<p variant="secondary">Following {countFollowing}</p>
								</OverlayTrigger>
								<OverlayTrigger
									className="view-foll"
									trigger="click"
									placement="bottom"
									rootClose="true"
									overlay={
										<Popover id={`popover-view-foll`}>
											<Popover.Body>
												{profile.followers.map((followers) => {
													return (
														<>
															{auth.name !== followers.name ? (
																<Link className="user-card-sm" to={`/u/${followers.name}`} onClick={redirect(`/u/${followers.name}`)} key={followers.id}>
																	<div className="user-card-l">
																		<Avatar image={followers.avatar} class={'avatar-card'} />
																	</div>
																	<div className="user-card-r">
																		<h5>@{followers.name}</h5>
																	</div>
																</Link>
															) : (
																<Link className="user-card-sm" to={`/user/${followers.name}`} onClick={redirect(`/user/${followers.name}`)} key={followers.id}>
																	<div className="user-card-l">
																		<Avatar image={followers.avatar} class={'avatar-card'} />
																	</div>
																	<div className="user-card-r">
																		<h5>@{followers.name}</h5>
																	</div>
																</Link>
															)}
														</>
													);
												})}
											</Popover.Body>
										</Popover>
									}
								>
									<p variant="secondary">Followers {countFollowers}</p>
								</OverlayTrigger>
								<div>{followCheck ? <Unfollow follow={setFollowers} followers={followers} count={setCountFollowers} /> : <Follow follow={setFollowers} count={setCountFollowers} />}</div>
							</div>
						</div>
					</div>
				</div>
				<UserPosts />
			</div>
		</>
	);
}
