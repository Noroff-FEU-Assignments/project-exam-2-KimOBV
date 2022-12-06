import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import ErrorMessage from '../../common/ErrorMessage';
import { useParams, Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import Avatar from '../../common/DefaultAvatar';
import PostMedia from '../../common/PostMedia';
import { ChatBubbleBottomCenterTextIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Loading from '../../common/LoadingIndicator';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ModalVertical from '../../common/ModalVertical';
import UpdatePost from './UpdatePost';
import Reactions from '../posts/Reactions';
import React from 'react';

export default function UserPosts() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});

	let { name } = useParams();

	//console.log(name);

	const http = useAxios();

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await http.get(`profiles/${name}/posts/?_author=true&?_comments=true&_reactions=true`);
				//const stats = await http.get(`posts/${}?_author=true&_comments=true&_reactions=true`);
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
	//console.log(stats);
	return (
		<>
			<div className="container-posts">
				{profile.map((post, index) => {
					//console.log(post);
					return (
						<div key={index} className="container-post">
							<div className="post-left">
								<Avatar image={post.author.avatar} class={'post-avatar'} />
							</div>
							<div className="post-right">
								<div id="post-r-top">
									<Link to={`/u/${post.author.name}`}>
										<b>{post.author.name}</b> · {moment(post.created).fromNow()}
									</Link>
									<OverlayTrigger
										className="icon icon-nav-mob"
										trigger="click"
										rootClose="true"
										placement="left"
										overlay={
											<Popover id={`popover-edit-post`}>
												<h3>Edit Post?</h3>
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
											</Popover>
										}
									>
										<Link id="settings" variant="link">
											<PencilSquareIcon id="settings" />
										</Link>
									</OverlayTrigger>
								</div>
								<Link to={`/posts/${post.id}`} className="post-cta">
									<h3>{post.title}</h3>
									<p>{post.body}</p>
									<PostMedia image={post.media} />
									<div className="ctr-reaction">
										<div className="r-l">
											<ChatBubbleBottomCenterTextIcon className="icon post-icon" />
											<span className="post-count">{post._count.comments}</span>
										</div>
										<Reactions reactions={post.reactions} />
									</div>
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
