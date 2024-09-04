import { Button, Modal } from "react-bootstrap";

import { Pin } from "../../types/global";

interface PinInfoModalProps {
  pinInfoModalOpen: boolean;
  handleCloseModal: () => void;
  pinInfo: Pin | null;
}

export const PinInfoModal = ({
  pinInfoModalOpen,
  handleCloseModal,
  pinInfo,
}: PinInfoModalProps) => {
  return (
    <Modal show={pinInfoModalOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{pinInfo?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <div className="flex items-center gap-1">
          <strong>{`City:`}</strong>
          <span>{pinInfo?.infoFromCoords.city}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>{`Road:`}</strong>
          <span>{pinInfo?.infoFromCoords.road}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>{`Neighbourhood:`}</strong>
          <span>{pinInfo?.infoFromCoords.neighbourhood}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>{`State:`}</strong>
          <span>{pinInfo?.infoFromCoords.state}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>{`Postcode:`}</strong>
          <span>{pinInfo?.infoFromCoords.postcode}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
