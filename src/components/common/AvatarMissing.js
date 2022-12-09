import defaultAvatar from '../../assets/default-avatar.svg';

export default function Avatar(props) {
	return (
		<>
			<img className={props.class} src={props.image !== '' && props.image !== null ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />
		</>
	);
}
