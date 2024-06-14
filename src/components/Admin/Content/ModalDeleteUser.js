import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const {setShowModalDetele, showModalDelete, dataUpdateDelete} = props


    const handleClose = () => setShowModalDetele(false);
    const handleBtnSubmitDelete = () => {
        alert('me')
    }

    return (
        <>
            <Modal
                show={showModalDelete}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete the user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user email:  
                    <b>{dataUpdateDelete && dataUpdateDelete.email ? dataUpdateDelete.email : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleBtnSubmitDelete()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;