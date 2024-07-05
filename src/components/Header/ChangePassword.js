import { useState } from "react"
import { PostChangePassWord } from "../Services/apiService"
import { toast } from "react-toastify"

const ChangePassWord = (props) => {

    const[password, setPassword] = useState('')
    const[newPassword, setNewPassword] = useState('')

    const handleUpdate = async() => {
        let res = await PostChangePassWord (password, newPassword)
        if(res && res.EC === 0){
            toast.success(res.EM)
            setPassword('')
            setNewPassword('')
        }else toast.error(res.EM)
    }
    
    
    return (
        <>
            <div className="col-md-6">
                <label className="form-label">Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </div>
            <div>   
                <button
                    className="btn btn-warning mt-4"
                    onClick={() => handleUpdate()}
                >Update
                </button>
            </div>
        </>
    )
}
export default ChangePassWord