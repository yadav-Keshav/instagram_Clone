import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/action/authAction';

export default function RegisterScreen() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const registerHandler = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        dispatch(register(name,email,password))
    }
    useEffect(() => {
        if (userInfo != null) {
            navigate("/");
        }
    }, [navigate, userInfo])
    return (
        <div className='register-screen'>
            <h2>Register</h2>
            <div>
                <input type='text' placeholder='Name' required onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Register' onClick={registerHandler} />
            </div>
        </div>
    )
}
