import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import { RiUserAddLine } from "react-icons/ri";
import TableUser from './TableUser';
import { useEffect, useState } from "react"
import { getAllUser } from "../../Services/apiService"
import ModalUpdateUser from './ModalUpdateUser';


const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})

    const handleBtnUpdate = (item) => {
        setShowModalUpdate(true)
        setDataUpdate(item)
    }
    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    useEffect(() => {
        fetchListUser()
    }, [])
    return (
        <div className="manage-user-container">
            <div className="manage-user-title">
                ManageUser
            </div>
            <div className="manage-user-content">
                <div className='btn-add-new'>
                    <button type="button" className="btn btn-secondary"
                        onClick={() => setShowModal(true)}>
                        <RiUserAddLine /> Add new user
                    </button>
                </div>
                <div className='table-users-container'>
                    <TableUser 
                    listUser={listUser} 
                    handleBtnUpdate = {handleBtnUpdate}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowModal}
                    fetchListUser={fetchListUser}
                />

            </div>
            <ModalUpdateUser
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                dataUpdate = {dataUpdate}
            />
        </div>
    )
}

export default ManageUser