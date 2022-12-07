import Modal from 'react-bootstrap/Modal';

export default function ModalVertical(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{props.heading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
		</Modal>
	);
}
