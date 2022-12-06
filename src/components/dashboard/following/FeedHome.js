import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import PostMedia from '../../common/PostMedia';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../common/ErrorMessage';
import Avatar from '../../common/DefaultAvatar';
import Loading from '../../common/LoadingIndicator';
import Reactions from '../posts/Reactions';

export default function GetFeedHome() {
	const [followers, setFollowers] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();
	useEffect(() => {
		async function fetchFollowers() {
			try {
				const response = await http.get('posts/following?_author=true&_comments=true&_reactions=true');
				if (response.status === 200) {
					setFollowers(response.data);
				}
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchFollowers();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage>{error}</ErrorMessage>;
	}

	if (followers.length === 0) {
		return <div>You are not following anyone yet!</div>;
	}

	return (
		<>
			<div className="container-posts">
				{followers.map((post) => {
					//console.log(post);
					return (
						<div key={post.id} className="container-post">
							<div className="post-left">
								<Link to={`/u/${post.author.name}`}>
									<Avatar image={post.author.avatar} class={'post-avatar'} />
								</Link>
							</div>
							<div className="post-right">
								<Link to={`/u/${post.author.name}`}>
									<b>@{post.author.name}</b>
								</Link>
								<span>{moment(post.created).fromNow()}</span>
								<Link to={`/posts/${post.id}`} className="post-cta">
									<h3>{post.title}</h3>
									<p>{post.body}</p>
									<PostMedia image={post.media} onError={(e) => (e.target.style.display = 'none')} />
									<div className="ctr-reaction">
										<div className="r-l">
											<ChatBubbleBottomCenterTextIcon className="icon post-icon" />
											<span className="post-count">{post.comments.length}</span>
										</div>
										<Reactions reactions={post.reactions} />
									</div>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
