import Heading from '../../layout/Heading';
import Avatar from '../../common/DefaultAvatar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

export default function UserFollowing({ followers, following }) {
	const [key, setKey] = useState('followers');
	const [toggle, setToggle] = useState(true);

	return (
		<div className="user-follow-container">
			<div className="d-flex align-items-end gap-2">
				<Heading size={2} title="ToAd's" />
				<span onClick={() => setToggle(!toggle)}>{toggle === true ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}</span>
			</div>
			{toggle && (
				<Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mt-4">
					<Tab eventKey="followers" title="Followers">
						{followers.map((follow, index) => {
							return (
								<div key={index} className="follow-profile">
									<Link to={`/profile/${follow.name}`} className="d-flex align-items-end gap-2">
										<Avatar image={follow.avatar} class={'following-avatar'} />
										<span>{follow.name}</span>
									</Link>
								</div>
							);
						})}
					</Tab>
					<Tab eventKey="following" title="Following">
						{following.map((following, index) => {
							return (
								<div key={index} className="follow-profile">
									<Link to={`/profile/${following.name}`} className="d-flex align-items-end gap-2">
										<Avatar image={following.avatar} class={'following-avatar'} />
										<span>{following.name}</span>
									</Link>
								</div>
							);
						})}
					</Tab>
				</Tabs>
			)}
		</div>
	);
}

UserFollowing.propTypes = {
	followers: PropTypes.array.isRequired,
	following: PropTypes.array.isRequired,
};
