import { useState } from 'react'
import './Login.scss'


const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleBtnLogin = () => {
        alert('me')
    }
    return (
        <div className="login-Container">
            <div className="header">
                Don't have an account yet?
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
            </div>
        </div>
    )
}
export default Login