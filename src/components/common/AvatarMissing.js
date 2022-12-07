import defaultAvatar from '../../images/default-avatar.png';

export default function Avatar(props) {
	return (
		<>
			<img className={props.class} src={props.image !== '' && props.image !== null ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />
		</>
	);
}
