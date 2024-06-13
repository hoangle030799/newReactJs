import { useEffect, useState } from "react"
import { getAllUser } from "../../Services/apiService"



const TableUser = (props) => {
    const [listUser, setListUser] = useState([])

    const fetchListUser = async () => {
        let res = await getAllUser()
        if(res.EC === 0){
            setListUser(res.DT)
        }
     }
     useEffect(() => {
         fetchListUser()
     }, [])
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0
                        && listUser.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>    
                                </tr>
                            )
                        })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan = {'4'}>Not fount data</td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
}
export default TableUser