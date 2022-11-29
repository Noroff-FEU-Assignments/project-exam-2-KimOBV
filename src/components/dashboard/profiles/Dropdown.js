import Dropdown from 'react-bootstrap/Dropdown';
import UpdateBanner from '../user/UpdateBanner';
import UpdateAvatar from '../user/UpdateAvatar';
import ModalVertical from '../../common/ModalVertical';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function DropdownMenu() {
	const [modalShowBanner, setModalShowBanner] = useState(false);
	const [modalShowAvatar, setModalShowAvatar] = useState(false);

	let { name } = useParams();

	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				<Cog6ToothIcon className="settings" />
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item href="#/action-1">
					<div onClick={() => setModalShowBanner(true)} className="dropdown-link">
						Update banner
					</div>
					<ModalVertical show={modalShowBanner} onHide={() => setModalShowBanner(false)} heading="Update Banner">
						<UpdateBanner name={name} />
					</ModalVertical>
				</Dropdown.Item>
				<Dropdown.Item href="#/action-2">
					<div onClick={() => setModalShowAvatar(true)} className="dropdown-link">
						Update Avatar
					</div>
					<ModalVertical show={modalShowAvatar} onHide={() => setModalShowAvatar(false)} heading="Update Avatar">
						<UpdateAvatar name={name} />
					</ModalVertical>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
