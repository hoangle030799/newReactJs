import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../Services/apiService'
import { toast } from 'react-toastify';



const Login = (props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleBtnLogin = async () => {
        //validate

        //submit api
        let data = await postLogin (email, password)
        if(data && data.EC === 0){
            toast.success (data.EM)
            navigate('/')
        }else{
            toast.error (data.EM)
        }
    }
    return (
        <div className="login-Container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
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
                    <button className='btn-login' onClick={() => handleBtnLogin()}>Login to HoangHeoThy</button>
                </div>
                <span className='backToHome'onClick={() => {navigate('/')}}>&#60;&#60;Back to Home page</span>
            </div>
        </div>
    )
}
export default Login