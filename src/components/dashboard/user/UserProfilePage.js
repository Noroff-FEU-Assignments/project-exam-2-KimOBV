import Heading from '../../layout/Heading';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import DeletePost from './DeletePost';
import Avatar from '../../common/DefaultAvatar';
import Banner from '../../common/DefaultBanner';
import Dropdown from '../profiles/Dropdown';
import ModalVertical from '../../common/ModalVertical';
import PostMedia from '../../common/PostMedia';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function UserProfile() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});
	document.title = `Howler | ${profile.name}`;

	let { name } = useParams();

	const http = useAxios();

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
				console.log(response.data);
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
		return <div>...Loading</div>;
	}

	if (error) {
		return <ErrorMessage />;
	}

	const showFollowers = () => {
		const followerContainer = document.querySelector('.followers-container');
		followerContainer.classList.toggle('d-none');
	};
	const showFollowing = () => {
		const followerContainer = document.querySelector('.following-container');
		followerContainer.classList.toggle('d-none');
	};

	return (
		<div className="user-profile-container">
			<Banner image={profile.banner} class={'user-profile-banner'} />
			<Avatar image={profile.avatar} class={'user-avatar'} alt={profile.name} />
			<div className="user-info-container d-flex">
				<div className="px-3 flex-grow-1">
					<Heading title={'@' + profile.name} />
					<span className="text-muted">{profile.email}</span>
				</div>
				<div className="d-flex flex-grow-1 justify-content-center gap-4 text-center align-self-center">
					<div onClick={showFollowers} className="follow-feed">
						<span className="d-block count-follow-text">{profile._count.followers} Followers</span>
					</div>
					<div onClick={showFollowing} className="follow-feed">
						<span className="d-block count-follow-text">{profile._count.following} Following</span>
					</div>
					<div>
						<Dropdown />
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
									<div className="d-flex gap-5">
										<button
											className="cta"
											onClick={() => {
												setModalData(post);
												setModalShow(true);
											}}
										>
											Update
										</button>
										<DeletePost id={post.id} />
									</div>
								</div>
							</div>
						);
					})}
				</Col>
			</Row>
			<ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
				<UpdateForm id={modalData.id} title={modalData.title} body={modalData.body} />
			</ModalVertical>
		</div>
	);
}
