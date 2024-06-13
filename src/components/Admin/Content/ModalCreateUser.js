import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddFill } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';



const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false)
        setEmail('')
        setPassword('')
        setUserName('')
        setRole('')
        setImage('')
        setPreviewImage('')
    }


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage((event.target.files[0]))
        } else {
            setPreviewImage('')
        }

    }

    const handleSubmit = async() => {
        //validate
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('Validate Email !!!')
            return
        }
        if(password.length<6){
            toast.error('Validate Password !!!')
            return
        }
        
        

        //call api
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', userName);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data)
        // axios.post('http://localhost:8081/api/v1/participant', data)
        console.log('check res', res.data)
        if(res.data && res.data.EC === 0){
            toast.success (res.data.EM)
            handleClose()
        }else{
            toast.error (res.data.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >

                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
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
export default ModalCreateUser