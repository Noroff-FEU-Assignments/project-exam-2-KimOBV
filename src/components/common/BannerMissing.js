import defaultBanner from '../../assets/default-banner.png';

export default function Banner(props) {
	return (
		<div style={{ backgroundImage: `url(${props.image !== '' && props.image !== null ? props.image : defaultBanner})` }} className={props.class}>
			{props.children}
		</div>
	);
}
