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
export { postCreateNewUser, getAllUser, putUpdateUser }