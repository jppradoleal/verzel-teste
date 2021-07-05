import React from 'react';
import Modal from 'react-modal';

interface IProps {
    isOpen: boolean,
    closeModal: () => void,
    onAccept: () => void,
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const ConfirmDeleteModal = ({isOpen, closeModal, onAccept}:IProps) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Confirmar deleção" id="modal" style={customStyles} >
            <p>Este registro não poderá ser recuperado, tem certeza que deseja excluí-lo?</p>
            <div className="btn-group">
                <button onClick={closeModal} className="reject">Não</button>
                <button onClick={onAccept} className="accept">Sim</button>
            </div>
        </Modal>
    );
}

export default ConfirmDeleteModal;