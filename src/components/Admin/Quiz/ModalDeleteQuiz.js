import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz, getAllQuizForAdmin } from '../../Services/apiService';
import { toast } from 'react-toastify';



const ModalDeleteQuiz = (props) => {
    const { setShowModalDeleteQuiz, showModalDeleteQuiz, listQuizUpdateDelete } = props


    const handleClose = () => setShowModalDeleteQuiz(false);

    const handleBtnSubmitDelete = async (id) => {
        let data = await deleteQuiz(listQuizUpdateDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // props.setCurrentPage(1)
            props.fetchQuiz()
        } else {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={showModalDeleteQuiz}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete the quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz ID:&nbsp;
                    <b>{listQuizUpdateDelete && listQuizUpdateDelete.id ? listQuizUpdateDelete.id : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={(quizId) => handleBtnSubmitDelete(quizId)}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;