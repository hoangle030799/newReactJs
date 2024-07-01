import { useState } from 'react'
import register from '../../Assets/register.jpg'
import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { postSignup } from '../Services/apiService'
import { toast } from 'react-toastify';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Language from '../Header/Language'


const Register = (props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isShowPassWord, setIsShowPassWord] = useState(false)

    const handleBtnSignUp = async () => {
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
        if (password.length < 6) {
            toast.error('Validate Password !!!')
            return
        }
        //submit api
        let data = await postSignup(email, username, password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/Login')
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <div className="register-container">
            <div className="content-left">
                <div className='content'>
                    <div className="title-1">
                        <h1>Sign up</h1>
                        <h1>and come on in</h1>
                    </div>
                    <img className='col-5' src={register} />
                    <div className='bottom'>@HoangHeoThy</div>
                </div>
            </div>
            <div className="content-right">
                <div className='header'>
                    <span>Already have an account?</span>
                    <button onClick={() => { navigate('/Login') }}>Log in</button>
                    <Language/>
                </div>
                <div className='title'>
                    <h1>HoangHeoThy</h1>
                </div>
                <div className='content mx-auto'>
                    Get better data with conversational forms, surveys, quizzes & more.
                </div>
                <div className='input-form col-5 mx-auto'>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder="Email"
                            value={email}
                            className='form-control'
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='form-group pass-group'>
                        <input
                            type={isShowPassWord ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            className='form-control'
                            onChange={(event) => setPassword(event.target.value)} />

                        {isShowPassWord ?
                            <span className='icon-eye' onClick={() => setIsShowPassWord(false)}>
                                <IoMdEyeOff />
                            </span>
                            :
                            <span className='icon-eye' onClick={() => setIsShowPassWord(true)}>
                                <IoEye />
                            </span>
                        }
                    </div>

                    <div className='form-group'>
                        <input
                            type='username'
                            placeholder="Username"
                            value={username}
                            className='form-control'
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className='btn-signUp'>
                        <button onClick={() => handleBtnSignUp()}>Create my free account</button>
                    </div>
                    <span className='backToHome' onClick={() => { navigate('/') }}>&#60;&#60;Back to Home page</span>
                </div>
            </div>
        </div>
    )
}
export default Register