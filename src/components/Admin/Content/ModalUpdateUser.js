import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddFill } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../Services/apiService'
import _ from 'lodash';


const ModalUpdateUser = (props) => {
    const { showModalUpdate, setShowModalUpdate, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setShowModalUpdate(false)
        setEmail('')
        setPassword('')
        setUserName('')
        setRole('')
        setImage('')
        setPreviewImage('')
        setDataUpdate()
    }


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setPassword(password)
            setUserName(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage('')
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

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
        let data = await putUpdateUser(dataUpdate.id, userName, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await props.fetchListUser()
        } else {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >

                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option selected value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
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
export default ModalUpdateUser