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
								<p onClick={showFollowing}>Following {profile._count.following}</p>
								<p onClick={showFollowers}>Followers {profile._count.followers}</p>
								<Dropdown />
							</div>
						</div>
					</div>
					<ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
						<UpdateForm id={modalData.id} title={modalData.title} body={modalData.body} />
					</ModalVertical>
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
		</>
	);
}
