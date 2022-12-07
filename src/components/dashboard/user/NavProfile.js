import { Link } from 'react-router-dom';
import Avatar from '../../common/AvatarMissing';

export default function UserProfile() {
	const user = JSON.parse(localStorage.getItem('auth'));

	return (
		<Link to={`/user/${user.name}`} className="user-link d-flex flex-column">
			<Avatar image={user.avatar} class={'avatar'} alt={user.name} />
		</Link>
	);
}
