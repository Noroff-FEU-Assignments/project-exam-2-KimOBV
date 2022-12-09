import useAxios from '../../../hooks/useAxios';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../common/ErrorMessage';
import { Link } from 'react-router-dom';
import Avatar from '../../common/AvatarMissing';
import Banner from '../../common/BannerMissing';

export default function ProfilesList() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);

	const http = useAxios();

	useEffect(() => {
		async function getProfiles() {
			try {
				const response = await http.get('profiles/');
				//console.log('response', response);
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
				{profiles.map((profile, index) => {
					console.log(profile._count);
					return (
						<div key={index} className="container-people">
							<Banner image={profile.banner} class={'people-banner'} />
							<Link className="people-link" to={`/u/${profile.name}`}>
								<div className="people-info">
									<div className="people-info-left">
										<Avatar image={profile.avatar} class={'people-avatar'} alt={profile.name} />
									</div>
									<div className="people-info-right">
										<div className="people-info-top">
											<h3>{'@' + profile.name}</h3>
											<p className="text-muted">{profile.email}</p>
										</div>
										<div className="people-info-bottom">
											<p>Following {profile._count.following}</p>
											<p>Followers {profile._count.followers}</p>
											<p>Posts {profile._count.posts}</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
}
