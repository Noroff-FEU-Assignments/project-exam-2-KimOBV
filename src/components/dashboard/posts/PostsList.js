import { useStore } from '../../../context/PostContext';
import { Link } from 'react-router-dom';
import PostMedia from '../../common/PostMedia';
import Row from 'react-bootstrap/Row';
import { ChatBubbleBottomCenterTextIcon, HeartIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import React from 'react';

export default function Explore() {
	const { state } = useStore();

	console.log('state', state);

	if (state.loading) {
		return <div>Loading...</div>;
	}

	if (state.error) {
		return <div>{state.error}</div>;
	}

	return (
		<div className="container post-list-container">
			<Row className="row-post-list">
				<div className="postlist-container">
					{state.posts.map((post) => {
						return (
							<div key={post.id} className="posts-container">
								<div className="d-flex gap-2">
									<Link to={`/profile/${post.author.name}`}>@{post.author.name}</Link>
									<h5 className="text-muted">{moment(post.created).fromNow()}</h5>
								</div>
								<Link to={`/posts/${post.id}`} className="post-cta">
									<h3>{post.title}</h3>
									<p>{post.body}</p>
									<PostMedia image={post.media} onerror="this.style.display='none'" />
								</Link>
								<div className="d-flex flex-end">
									<ChatBubbleBottomCenterTextIcon className="icon icon-comment" />
									<span className="post-count">{post._count.comments}</span>
									<HeartIcon className="icon icon-smile" />
									<span className="post-count">{post._count.reactions}</span>
								</div>
							</div>
						);
					})}
				</div>
			</Row>
		</div>
	);
}
