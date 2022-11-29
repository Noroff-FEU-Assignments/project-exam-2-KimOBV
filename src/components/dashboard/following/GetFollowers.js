import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import PostMedia from '../../common/PostMedia';
import { ChatBubbleBottomCenterTextIcon, HeartIcon } from '@heroicons/react/24/outline';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from '../../common/LoadingIndicator';
import ErrorMessage from '../../common/ErrorMessage';

export default function GetFollowers() {
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
		return <div>No followers yet</div>; //update this with link and styling
	}

	return (
		<>
			<div className="container post-list-container">
				<Row className="row-post-list">
					<div className="postlist-container">
						{followers.map((follow) => {
							return (
								<div key={follow.id} className="posts-container">
									<div className="d-flex gap-2">
										<Link to={`/profile/${follow.author.name}`}>@{follow.author.name}</Link>
										<h5 className="text-muted">{moment(follow.created).fromNow()}</h5>
									</div>
									<Link to={`/posts/${follow.id}`} className="post-cta">
										<h3>{follow.title}</h3>
										<p>{follow.body}</p>
										<PostMedia image={follow.media} />
									</Link>
									<div className="d-flex flex-end">
										<ChatBubbleBottomCenterTextIcon className="icon icon-comment" />
										<span className="post-count">{follow._count.comments}</span>
										<HeartIcon className="icon icon-smile" />
										<span className="post-count">{follow._count.reactions}</span>
									</div>
								</div>
							);
						})}
					</div>
				</Row>
			</div>
		</>
	);
}
