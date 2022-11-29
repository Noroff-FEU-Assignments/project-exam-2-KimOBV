import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
	return (
		<div className="d-flex flex-column align-items-center mt-5">
			<Spinner animation="grow" className="loader" />
			<p className="display-5">Loading</p>
		</div>
	);
}
