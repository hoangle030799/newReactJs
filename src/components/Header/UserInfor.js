import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { RiImageAddFill } from "react-icons/ri";
import _ from "lodash";
import { postProfile } from "../Services/apiService";


const UserInfor = (props) => {
    const account = useSelector(state => state.user.account)

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')


    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email)
            setUserName(account.username)
            setRole(account.role)
            setImage('')
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }
    },[account])

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage((event.target.files[0]))
        } else {
            setPreviewImage('')
        }
    }

    const handleUpdate = async () => {
        let data = await postProfile(userName, image)
    }

    return (
        <form className="row g-3 userInfor">
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
                <select className="form-select" disabled>
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
            <div className='col-md-12 profile_img'>
                {previewImage ?
                    <img src={previewImage} />
                    :
                    <span>Preview image</span>
                }
            </div>
            <div>   
                <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate()}
                >Update
                </button>
            </div>
        </form>
    )
}
export default UserInfor