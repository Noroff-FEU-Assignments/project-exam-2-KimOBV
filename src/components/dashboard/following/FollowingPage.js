import GetFollowers from './GetFollowers';

export default function Feed() {
	document.title = `Howler | Feed`;
	return (
		<div className="theme-page-container mx-3">
			<GetFollowers />
		</div>
	);
}
