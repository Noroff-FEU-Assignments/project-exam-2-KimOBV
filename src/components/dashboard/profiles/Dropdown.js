import UpdateBanner from '../user/UpdateBanner';
import UpdateAvatar from '../user/UpdateAvatar';
import ModalVertical from '../../common/ModalVertical';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function DropdownMenu() {
	const [modalShowBanner, setModalShowUpdate] = useState(false);

	let { name } = useParams();

	return (
		<>
			<Button variant="link" className="settings" onClick={() => setModalShowUpdate(true)}>
				<Cog6ToothIcon id="settings" />
			</Button>
			<ModalVertical show={modalShowBanner} onHide={() => setModalShowUpdate(false)} heading="Update your profile">
				<UpdateBanner name={name} />
				<br />
				<UpdateAvatar name={name} />
			</ModalVertical>
		</>
	);
}
