import { useStore } from '../../../context/PostContext';
import { Link } from 'react-router-dom';
import PostMedia from '../../common/PostMedia';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Avatar from '../../common/AvatarMissing';
import Loading from '../../common/Loading';
import Reactions from './Reactions';

export default function GetFeedExplore() {
	const { state } = useStore();
	if (state.loading) {
		return <Loading />;
	}
	if (state.error) {
		return <div>{state.error}</div>;
	}
	return (
		<>
			<div className="container-posts">
				{state.posts.map((post) => {
					return (
						<div key={post.id} className="container-post">
							<Link to={`/u/${post.author.name}`} className="post-left">
								<Avatar image={post.author.avatar} class={'post-avatar'} />
							</Link>
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
