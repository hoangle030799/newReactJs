import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from '../../Services/apiService'
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {
    const {setShowModalDetele, showModalDelete, dataUpdateDelete} = props


    const handleClose = () => setShowModalDetele(false);

    const handleBtnSubmitDelete = async () => {
        let data = await deleteUser(dataUpdateDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1)
        } else {
            toast.error(data.EM)
        }
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