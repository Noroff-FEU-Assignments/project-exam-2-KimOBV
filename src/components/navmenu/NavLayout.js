import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import NavProfile from '../dashboard/user/NavProfile';
import ModalVertical from '../common/ModalVertical';
import logo from '../../assets/Logo_Round.png';
import { ArrowRightOnRectangleIcon, HashtagIcon, HomeIcon, MegaphoneIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Avatar from '../common/AvatarMissing';

export default function NavLayout() {
	const [auth, setAuth] = useContext(AuthContext);
	const [modalShowLog, setModalShowLog] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('auth'));

	const logout = () => {
		setAuth(null);
		navigate('/login');
		setModalShowLog(false);
	};

	return (
		<>
			<Nav className="ctr-nav d-none d-md-flex nav-lg">
				{auth ? (
					<>
						<div className="ctr-nav-top">
							<div className="ctr-logo">
								<NavLink to="/home" className="ctr-logo">
									<img className="logo-img" src={logo} alt="Howler monkey" />
								</NavLink>
							</div>
							<div className="ctr-link">
								<NavLink to="/home">
									<HomeIcon className="icon icon-nav" />
									<span>Home</span>
								</NavLink>
								<NavLink to="/explore">
									<HashtagIcon className="icon icon-nav" />
									<span>Explore</span>
								</NavLink>
								<NavLink to="/people">
									<UsersIcon className="icon icon-nav" />
									<span>People</span>
								</NavLink>
								<NavLink to={`/user/${user.name}`}>
									<UserIcon className="icon icon-nav" />
									<span>Profile</span>
								</NavLink>
								<br />
								<div className="ctr-post">
									<NavLink className={'btn btn-primary post-btn post-btn-nav'} to="/new-post">
										<span id="post-btn-txt">Post</span>
										<MegaphoneIcon id="post-icon" />
									</NavLink>
								</div>
							</div>
						</div>
						<div className="ctr-user">
							<OverlayTrigger
								className="icon icon-nav-mob"
								trigger="click"
								rootClose
								placement="top"
								overlay={
									<Popover id={`popover`}>
										<Link className="logout-mob" onClick={() => setModalShowLog(true)}>
											<ArrowRightOnRectangleIcon className="icon icon-nav" />
											Logout
										</Link>
										<ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Do you want to log out of Howler?">
											<div className="div-body">
												<p>Are you certain you want to log out?</p>
												<button onClick={logout} className="btn-primary btn-logout">
													Yes, log me out
												</button>
											</div>
										</ModalVertical>
									</Popover>
								}
							>
								<Button className="user-link" variant="link">
									<Avatar image={user.avatar} class={'avatar'} alt={user.name} />
								</Button>
							</OverlayTrigger>
						</div>
					</>
				) : (
					<NavLink onClick="reloadCurrent()" className="logo-container">
						<img className="logo-img" src={logo} alt="Howler monkey" />
					</NavLink>
				)}
			</Nav>

			<Nav className="d-block d-md-none d-sm-flex nav-lg">
				{[false].map((expand) => (
					<Navbar key={expand} expand={expand} className=" p-0">
						<Nav className="flex-grow-1 pe-3">
							{auth ? (
								<>
									<div className="mobile-nav">
										<NavLink to="/home">
											<HomeIcon className="icon icon-nav-mob" />
										</NavLink>
										<NavLink to="/explore">
											<HashtagIcon className="icon icon-nav-mob" />
										</NavLink>
										<NavLink to="/people">
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
													<ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Do you want to log out of Howler?">
														<div className="div-body">
															<p>Are you certain you want to log out?</p>
															<button onClick={logout} className="btn-primary btn-logout">
																Yes, log me out
															</button>
														</div>
													</ModalVertical>
												</Popover>
											}
										>
											<Button id="profile-btn-mob" className="">
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
		</>
	);
}
