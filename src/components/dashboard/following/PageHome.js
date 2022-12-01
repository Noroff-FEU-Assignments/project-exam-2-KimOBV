import CreatePost from '../posts/CreatePost';
import GetFeedHome from './FeedHome';

export default function HomeFeed() {
	document.title = `Home | Howler`;
	return (
		<>
			<CreatePost />
			<GetFeedHome />
		</>
	);
}
