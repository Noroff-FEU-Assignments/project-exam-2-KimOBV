import useAxios from '../../../hooks/useAxios';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../common/ErrorMessage';
import { Link } from 'react-router-dom';
import Avatar from '../../common/DefaultAvatar';
import Banner from '../../common/DefaultBanner';
import { Row } from 'react-bootstrap';

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
			<div className="container-peoples">
				{profiles.map((profile) => {
					console.log(profile);
					return (
						<div key={profile.id} className="container-people">
							<Link to={`/u/${profile.name}`}>
								<Banner image={profile.banner} class={'container-banner'}>
									<Avatar image={profile.avatar} class={'container-avatar'} alt={profile.name} />
								</Banner>
								<h3>@{profile.name}</h3>
								<div className="person-stats">
									<p>Following {profile._count.following}</p>
									<p>Followers {profile._count.followers}</p>
									<p>Posts {profile._count.posts}</p>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
}
