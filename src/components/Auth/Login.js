import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../Services/apiService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";




const Login = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const handleBtnLogin = async () => {
        //validate
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Validate Email !!!')
            return
        }
        if (!password) {
            toast.error('Validate Password !!!')
            return
        }
        setIsloading(true)
        //submit api
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsloading(false)
            // navigate('/')
        } else {
            toast.error(data.EM)
            setIsloading(false)
        }
    }
    return (
        <div className="login-Container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/Register') }}>Sign up</button>
                <span>Contact us</span>
            </div>
            <div className="title col-3 mx-auto">
                <h1>HoangHeoThy</h1>
            </div>
            <div className="wecome col-3 mx-auto">
                Hello, who's this?
            </div>
            <div className="content-form col-3 mx-auto">
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <span className='forgot-password'>
                    Forgot password ?
                </span>
                <div>
                    <button
                        className='btn-login'
                        onClick={() => handleBtnLogin()}
                        disabled = {isLoading}
                    >
                        {isLoading === true && <ImSpinner9 className='loaderIcon'/>}
                        <span>Login to HoangHeoThy</span>
                    </button>
                </div>
                <span className='backToHome' onClick={() => { navigate('/') }}>&#60;&#60;Back to Home page</span>
            </div>
        </div>
    )
}
export default Login