import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
	return (
		<>
			<div className="container-spinner">
				<Spinner className="spinner" animation="border" variant="secondary" />
			</div>
		</>
	);
}
