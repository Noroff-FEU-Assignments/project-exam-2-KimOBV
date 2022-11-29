import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import NavProfile from '../dashboard/user/NavProfile';
import ModalVertical from '../common/ModalVertical';
import logo from '../../images/Logo_Round.png';
import { ArrowRightOnRectangleIcon, HashtagIcon, HomeIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Avatar from '../common/DefaultAvatar';

export default function NavLayout() {
	const [auth, setAuth] = useContext(AuthContext);
	const [modalShowLog, setModalShowLog] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('auth'));

	const logout = () => {
		setAuth(null);
		navigate('/');
		setModalShowLog(false);
	};

	return (
		<header>
			<Nav className="desktop-nav d-none d-lg-flex nav-lg">
				{auth ? (
					<>
						<NavLink onClick="reloadCurrent()" className="logo-container">
							<img className="logo-img" src={logo} alt="Howler monkey" />
							Howler
						</NavLink>
						<div className="admin-container">
							<NavLink className={'cta-secondary'} to="/new-post">
								New post
							</NavLink>
							<br />
							<br />
							<NavLink to="/feed">
								<HomeIcon className="icon icon-nav" />
								Home
							</NavLink>
							<NavLink to="/posts">
								<HashtagIcon className="icon icon-nav" />
								Explore
							</NavLink>
							<NavLink to="/profiles">
								<UsersIcon className="icon icon-nav" />
								People
							</NavLink>
							<NavLink to={`/user/${user.name}`}>
								<UserIcon className="icon icon-nav" />
								Profile
							</NavLink>
						</div>
						<div className="user-container">
							<NavProfile />
							<Link onClick={() => setModalShowLog(true)}>
								<ArrowRightOnRectangleIcon className="icon icon-nav" />
								Logout
							</Link>
							<ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Do you want to log out of Howler?">
								<p>Are you certain you want to log out?</p>
								<button onClick={logout} className="cta-secondary">
									Yes, log me out
								</button>
							</ModalVertical>
						</div>
					</>
				) : (
					<NavLink onClick="reloadCurrent()" className="logo-container">
						<img className="logo-img" src={logo} alt="Howler monkey" />
						Howler
					</NavLink>
				)}
			</Nav>

			<Nav className="d-block d-lg-none mobile-nav-wrapper">
				{[false].map((expand) => (
					<Navbar key={expand} expand={expand} className="mobile-nav p-0">
						<Nav className="justify-content-end flex-grow-1 pe-3">
							{auth ? (
								<>
									<div className="mobile-nav">
										<NavLink to="/feed">
											<HomeIcon className="icon icon-nav-mob" />
										</NavLink>
										<NavLink to="/posts">
											<HashtagIcon className="icon icon-nav-mob" />
										</NavLink>
										<NavLink to="/profiles">
											<UsersIcon className="icon icon-nav-mob" />
										</NavLink>
										<OverlayTrigger
											className="icon icon-nav-mob"
											trigger="click"
											rootClose
											placement="top"
											overlay={
												<Popover id={`popover`}>
													<NavProfile />
													<NavLink className={'cta-secondary newpost-mob'} to="/new-post">
														New post
													</NavLink>
													<Link className="logout-mob" onClick={() => setModalShowLog(true)}>
														<ArrowRightOnRectangleIcon className="icon icon-nav" />
														Logout
													</Link>
												</Popover>
											}
										>
											<Button className="profile-btn-mob">
												<Avatar image={user.avatar} class={'avatar'} alt={user.name} />
											</Button>
										</OverlayTrigger>
									</div>
								</>
							) : (
								<></>
							)}
						</Nav>
					</Navbar>
				))}
			</Nav>
		</header>
	);
}
