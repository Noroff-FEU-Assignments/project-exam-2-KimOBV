import notFound from '../../images/notFound.png';

export default function NorFound() {
	document.title = `Explore | Howler`;
	return (
		<>
			<div className="ctr-notFound">
				<h1 id="notFound">
					Error 404 <br /> Page not found...
				</h1>
				<img src={notFound} alt="404 - page not found"></img>
			</div>
		</>
	);
}
