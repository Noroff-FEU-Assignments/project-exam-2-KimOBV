import Heading from '../../layout/Heading';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import Avatar from '../../common/DefaultAvatar';
import Banner from '../../common/DefaultBanner';
import Dropdown from '../profiles/Dropdown';
import ModalVertical from '../../common/ModalVertical';
import Row from 'react-bootstrap/Row';
import Loading from '../../common/LoadingIndicator';
import UserPosts from './UserPosts';

export default function UserProfile() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});
	document.title = `${profile.name} | Howler`;

	let { name } = useParams();

	const http = useAxios();

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
				//console.log(response.data);
				setProfile(response.data);
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
									<span className="d-block count-follow-text">{profile._count.followers} Followers</span>
								</div>
								<div onClick={showFollowing} className="follow-feed">
									<span className="d-block count-follow-text">{profile._count.following} Following</span>
								</div>
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
									//console.log(follow.followers);
									//console.log(profile.followers);
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
						<ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
							<UpdateForm id={modalData.id} title={modalData.title} body={modalData.body} />
						</ModalVertical>
					</div>
				</Row>
			</div>
		</>
	);
}
