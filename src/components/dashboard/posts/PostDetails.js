import React from 'react';
import CommentPost from './CommentPost';
import ReactPost from './ReactPost';
import Reactions from './Reactions';
import PostMedia from '../../common/PostMedia';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/api';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useStore } from '../../../context/PostContext';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import Avatar from '../../common/DefaultAvatar';
import moment from 'moment';

export default function PostDetails(post) {
	const { state, setDetails, setComments } = useStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [auth] = useContext(AuthContext);
	const [key, setKey] = useState('comment');
	const [reactions, setReactions] = React.useState(post.reactions);

	let { id } = useParams();

	const url = BASE_URL + `posts/${id}?_author=true&_comments=true&_reactions=true`;

	useEffect(() => {
		async function getPostDetails() {
			const options = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			};
			try {
				const response = await fetch(url, options);
				if (response.ok) {
					const json = await response.json();
					setDetails(json);
					setComments(json.comments);
					setReactions(json.reactions);
				} else {
					setError('There was an error during the API request');
				}
			} catch (error) {
				setError(error.toString());
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getPostDetails();
		// eslint-disable-next-line
	}, [url]);

	if (loading) {
		return <div>Loading...</div>; //add loading indicator
	}

	if (error) {
		return <div>Error: An error occurred with the API call</div>; //add error component
	}
	//console.log('details', state.details);

	const ppl = state.details.author.name;
	const t1 = `/u/`;
	const t2 = `/user/`;
	const test = { ppl } !== '' && ppl !== auth ? t1 : t2;

	return (
		<>
			<div key={state.id} className="container-post">
				<Link to={test + state.details.author.name} className="post-left">
					<Avatar image={state.details.author.avatar} class={'post-avatar'} />
				</Link>
				<div className="post-right">
					<Link to={test + state.details.author.name}>
						<b>@{state.details.author.name}</b>
					</Link>
					<span>{moment(state.details.created).fromNow()}</span>
					<div className="ctr-post">
						<h3>{state.details.title}</h3>
						<p>{state.details.body}</p>
						<PostMedia image={state.details.media} onError={(e) => (e.target.style.display = 'none')} />
						<div activekey={key} onSelect={(k) => setKey(k)} className="post-interactions ">
							<div className="ctr-reaction">
								<div className="r-l">
									<ChatBubbleBottomCenterIcon className="icon post-icon" />
									<span className="post-count">{state.comments.length}</span>
								</div>
								<Reactions reactions={reactions} />
							</div>
						</div>
						<div className="comment-tag">
							<ReactPost post={state} setReactions={setReactions} reactions={state.details.reactions} />
						</div>
						<CommentPost />
						<div className="ctr-comment">
							{state.comments.map((comment) => {
								const ppl = comment.author.name;
								const test = ppl !== '' && ppl !== auth.name ? t1 : t2;
								return (
									<div className="comment container-post" key={comment.id}>
										<Link to={test + comment.author.name} className="comment-left">
											<Avatar image={comment.author.avatar} class={'comment-avatar'} />
										</Link>
										<div className="comment-right">
											<div className="comment-r-top">
												<Link to={test + comment.author.name}>
													<b>@{comment.author.name}</b>
												</Link>
												<span>{moment(comment.created).fromNow()}</span>
											</div>
											<div className="comment-r-bottom"></div>
											<p className="user-comment">{comment.body}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
