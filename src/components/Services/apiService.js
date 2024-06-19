import { delay } from "lodash";
import axios from "../Ultils/axiosCostomize";
const postCreateNewUser = (email, password, userName, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}


const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, userName, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`,
        {
            email,
            password,
            delay: 5000
        }
    )
}
const postSignup = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

export { postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postSignup, getQuizByUser }