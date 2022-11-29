export default function PostMedia(props) {
	const imgHeight = '';
	const noImgHeight = 'hidden';

	return (
		<>
			<img src={`${props.image}`} style={{ visibility: `${props.image !== '' && props.image !== null ? imgHeight : noImgHeight}` }} alt={`${props.image}`} className="background-image post-media"></img>
		</>
	);
}
