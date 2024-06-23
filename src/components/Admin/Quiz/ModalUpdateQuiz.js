import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../Services/apiService'
import _ from 'lodash';
import Select from 'react-select';


const ModalUpdateQuiz = (props) => {
    const { showModalUpdateQuiz, setShowModalUpdateQuiz, listQuizUpdateQuiz, fetchQuiz } = props;

    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const handleClose = () => {
        setShowModalUpdateQuiz(false)
        setName('')
        setDescription('')
        setDifficulty('')
        setId('')
        setPreviewImage(null)
        // setDataUpdate()
    }


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [id, setId] = useState('')
    const [previewImage, setPreviewImage] = useState(null)
    const [image, setImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(listQuizUpdateQuiz)) {
            setName(listQuizUpdateQuiz.name)
            setDescription(listQuizUpdateQuiz.description)
            setDifficulty(listQuizUpdateQuiz.difficulty)
            setId(listQuizUpdateQuiz.id)
            if (listQuizUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${listQuizUpdateQuiz.image}`)
            }
        }
    }, [listQuizUpdateQuiz])

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage((event.target.files[0]))
        } else {
            setPreviewImage('')
        }

    }
    const handleSubmit = async () => {

        //call api
        let data = await putUpdateQuiz(listQuizUpdateQuiz.id, name, description, difficulty.value)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            fetchQuiz()
        } else {
            toast.error(data.EM)
        }
    }
   console.log (listQuizUpdateQuiz)

    return (
        <>
            <Modal
                show={showModalUpdateQuiz}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >

                <Modal.Header closeButton>
                    <Modal.Title>Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Difficulty</label>
                            <Select
                                        defaultValue={difficulty}
                                        onChange={setDifficulty}
                                        placeholder={listQuizUpdateQuiz.difficulty}
                                        options={options}
                                    />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Id</label>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                disabled
                                onChange={(event) => setId(event.target.value)}
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpLoad'>
                                <RiImageAddFill /> Upload file image</label>
                            <input
                                type='file'
                                id='labelUpLoad'
                                hidden
                                onChange={(event) => handleUpLoadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz