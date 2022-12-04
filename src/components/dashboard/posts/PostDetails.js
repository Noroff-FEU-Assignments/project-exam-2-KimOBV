import CommentPost from './CommentPost';
import ReactPost from './ReactPost';
import PostMedia from '../../common/PostMedia';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/api';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useStore } from '../../../context/PostContext';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import Avatar from '../../common/DefaultAvatar';
import moment from 'moment';

export default function PostDetails() {
	const { state, setDetails, setComments, setReactions } = useStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [auth] = useContext(AuthContext);
	const [key, setKey] = useState('comment');

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
	const t1 = `/u/${state.details.author.name}`;
	const t2 = `/user/${state.details.author.name}`;

	const test = { ppl } !== '' && ppl !== auth ? t1 : t2;

	return (
		<>
			<div key={state.id} className="container-post">
				<Link to={`${test}`} className="post-left">
					<Avatar image={state.details.author.avatar} class={'post-avatar'} />
				</Link>
				<div className="post-right">
					<Link to={`${test}`}>
						<b>@{state.details.author.name}</b>
					</Link>
					<span>{moment(state.created).fromNow()}</span>
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
								<div className="r-r">
									{state.reactions.map((react, index) => {
										return (
											<span className="post-count" key={index}>
												{react.symbol}
												{react.count}
											</span>
										);
									})}
								</div>
							</div>
						</div>
						<ReactPost />
						<CommentPost />
						<div className="ctr-comment">
							{state.comments.map((comment) => {
								console.log(comment);
								return (
									<div className="comment container-post" key={comment.id}>
										<Link to={test} className="comment-left">
											<Avatar image={comment.author.avatar} class={'comment-avatar'} />
										</Link>
										<div className="comment-right">
											<div className="comment-r-top">
												<Link to={test}>
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
