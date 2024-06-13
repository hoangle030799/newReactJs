import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import { RiUserAddLine } from "react-icons/ri";
import { useState } from 'react';
import TableUser from './TableUser';



const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="manage-user-container">
            <div className="manage-user-title">
                ManageUser
            </div>
            <div className="manage-user-content">
                <div className='btn-add-new'>
                    <button type="button" class="btn btn-secondary"
                    onClick={() => setShowModal(true)}>
                        <RiUserAddLine /> Add new user
                    </button>
                </div>
                <div className='table-users-container'>
                    <TableUser/>
                </div>
                <ModalCreateUser
                show = {showModal}
                setShow = {setShowModal}/>
            </div>
        </div>
    )
}

export default ManageUser