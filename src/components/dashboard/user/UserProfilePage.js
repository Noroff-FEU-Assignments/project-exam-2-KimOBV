import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import UpdateForm from './FormUpdate';
import Avatar from '../../common/AvatarMissing';
import Banner from '../../common/BannerMissing';
import ErrorMessage from '../../common/ErrorMessage';
import ModalVertical from '../../common/ModalVertical';
import Loading from '../../common/Loading';
import Dropdown from '../profiles/Dropdown';
import UserPosts from './UserPosts';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default function UserProfile() {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [modalData] = useState({});

	document.title = `${profile.name} | Howler`;

	let { name } = useParams();

	const http = useAxios();

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await http.get(`profiles/${name}?_following=true&_followers=true`);
				setProfile(response.data);
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getProfile();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage />;
	}

	return (
		<>
			<div className="ctr-profile">
				<div key={profile.id} className="container-people">
					<Banner image={profile.banner} class={'people-banner'} />
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
								<OverlayTrigger
									className="view-foll"
									trigger="click"
									placement="bottom"
									rootClose="true"
									overlay={
										<Popover id={`popover-view-foll`}>
											<Popover.Body>
												{profile.following.map((follow) => {
													return (
														<Link className="user-card-sm" to={`/u/${follow.name}`} key={follow.name}>
															<div className="user-card-l">
																<Avatar image={follow.avatar} class={'avatar-card'} />
															</div>
															<div className="user-card-r">
																<h5>@{follow.name}</h5>
															</div>
														</Link>
													);
												})}
											</Popover.Body>
										</Popover>
									}
								>
									<p variant="secondary">Following {profile._count.following}</p>
								</OverlayTrigger>
								<OverlayTrigger
									className="view-foll"
									trigger="click"
									placement="bottom"
									rootClose="true"
									overlay={
										<Popover id={`popover-view-foll`}>
											<Popover.Body>
												{profile.followers.map((follow) => {
													return (
														<Link className="user-card-sm" to={`/u/${follow.name}`} key={follow.name}>
															<div className="user-card-l">
																<Avatar image={follow.avatar} class={'avatar-card'} />
															</div>
															<div className="user-card-r">
																<h5>@{follow.name}</h5>
															</div>
														</Link>
													);
												})}
											</Popover.Body>
										</Popover>
									}
								>
									<p variant="secondary">Followers {profile._count.followers}</p>
								</OverlayTrigger>
								<Dropdown />
							</div>
						</div>
					</div>
					<ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
						<UpdateForm id={modalData.id} title={modalData.title} body={modalData.body} />
					</ModalVertical>
				</div>

				<UserPosts />
			</div>
		</>
	);
}
