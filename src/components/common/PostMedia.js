export default function PostMedia(props) {
	const imgHeight = '';
	const noImgHeight = 'none';

	return (
		<>
			<img src={`${props.image}`} style={{ display: `${props.image !== '' && props.image !== null ? imgHeight : noImgHeight}` }} alt={`${props.image}`} className="background-image post-media"></img>
		</>
	);
}
