import Heading from '../../layout/Heading';
import CommentPost from './CommentPost';
import ReactPost from './ReactPost';
import PostMedia from '../../common/PostMedia';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/api';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useStore } from '../../../context/PostContext';

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
		return <div>Error: An error occured with the API call</div>; //add error component
	}
	console.log('details', state.details);

	return (
		<div className="post-container container">
			<div className="post-inner-container">
				<h2>{state.details.title}</h2>

				<p className="post-details-body">{state.details.body}</p>
				<PostMedia image={state.details.media} />
				{state.reactions.map((react, index) => {
					return (
						<span key={index}>
							{react.symbol}
							{react.count}
						</span>
					);
				})}
				<div className="comment-container">
					{state.comments.map((comment) => {
						return (
							<div key={comment.id}>
								<span>
									{comment.owner}: {comment.body}
								</span>
							</div>
						);
					})}
				</div>
				<Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mt-3">
					<Tab eventKey="comment" title="Comment">
						<CommentPost />
					</Tab>
					<Tab eventKey="react" title="React">
						<ReactPost />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
