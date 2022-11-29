import useAxios from '../../../hooks/useAxios';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../common/ErrorMessage';
import { Link } from 'react-router-dom';
import Avatar from '../../common/DefaultAvatar';
import Banner from '../../common/DefaultBanner';

export default function ProfilesList() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);

	const http = useAxios();

	useEffect(() => {
		async function getProfiles() {
			try {
				const response = await http.get('profiles/');
				console.log('response', response);
				setProfiles(response.data);
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getProfiles();
		// eslint-disable-next-line
	}, []);

	if (loading) return <div>Loading profiles...</div>;

	if (error) return <ErrorMessage />;

	return (
		<>
			<div className="profile-list-container container">
				{profiles.map((profile, index) => {
					return (
						<Link to={`/profile/${profile.name}`} className="">
							<div key={index} className="profile-container">
								<Banner image={profile.banner} class={'profile-list-banner'}>
									<Avatar image={profile.avatar} class={'user-avatar profile-avatar'} alt={profile.name} />
								</Banner>
								<div className="profile-card-bottom">
									<div className="d-flex justify-content-end text-center pt-2">
										<div>
											<span className="d-block count-follow-text pe-5">{profile._count.following} Following</span>
										</div>
										<div>
											<span className="d-block count-follow-text">{profile._count.followers} Followers</span>
										</div>
									</div>
									<h2 className="profile-name pb-2">@{profile.name}</h2>
									<span className="profile-email d-block pb-2">{profile.email}</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
