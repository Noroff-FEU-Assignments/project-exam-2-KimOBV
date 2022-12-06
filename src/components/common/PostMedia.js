export default function PostMedia(props) {
	const image = '';
	const noImage = 'none';

	return (
		<>
			<img src={`${props.image}`} style={{ display: `${props.image !== '' && props.image !== null ? image : noImage}` }} alt={`${props.image}`} className="background-image post-media"></img>
		</>
	);
}
