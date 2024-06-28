import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUser } from '../../Services/apiService';


const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUser()
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            })
            setListUser(users)
        }
    }
    useEffect(() => {
        fetchQuiz()
        fetchUser()
    }, [])
    return (
        <div className="Assign-Quiz-Container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz: </label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User: </label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <button className='btn btn-warning mt-3'>&#62;Assign&#62;</button>
            </div>
        </div>
    )
}
export default AssignQuiz