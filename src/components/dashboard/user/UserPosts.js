import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import Avatar from '../../common/DefaultAvatar';
import PostMedia from '../../common/PostMedia';
import { ChatBubbleBottomCenterIcon, HeartIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Loading from '../../common/LoadingIndicator';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ModalVertical from '../../common/ModalVertical';
import UpdatePost from './UpdatePost';
import useStore from '../../../context/PostContext';

export default function UserPosts() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});
	const [followers, setFollowers] = useState();
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

	const { state } = useStore();

	console.log('state', state);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage />;
	}

	return (
		<>
			<div className="container-posts">
				{profile.posts.map((post, index) => {
					console.log(post);
					return (
						<div key={index} className="container-post">
							<div className="post-left">
								<Avatar image={profile.avatar} class={'post-avatar'} />
							</div>
							<div className="post-right">
								<Link to={`/u/${profile.name}`}>
									<b>@{profile.name}</b> · {moment(post.created).fromNow()}
								</Link>
								<OverlayTrigger
									className="icon icon-nav-mob"
									trigger="click"
									rootClose="true"
									placement="top"
									overlay={
										<Popover id={`popover`}>
											<div className="d-flex gap-5">
												<Button
													className="cta-secondary"
													onClick={() => {
														setModalData(post);
														setModalShow(true);
														document.body.click();
													}}
												>
													Update
												</Button>
												<DeletePost id={post.id} />
											</div>
										</Popover>
									}
								>
									<Link className="settings" variant="link">
										<PencilSquareIcon className="settings" />
									</Link>
								</OverlayTrigger>
								<Link to={`/posts/${post.id}`} className="post-cta">
									<h3>{post.title}</h3>
									<p>{post.body}</p>
									<PostMedia image={post.media} />
								</Link>
							</div>
						</div>
					);
				})}
				<ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
					<UpdatePost id={modalData.id} title={modalData.title} body={modalData.body} media={modalData.media} />
				</ModalVertical>
			</div>
		</>
	);
}
