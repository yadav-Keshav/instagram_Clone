import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/action/authAction';
import Loading from '../components/loading';
import ErrorMessage from '../components/message';

export default function RegisterScreen() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const {loading,message}=useSelector(state=>state.userRegister);
    const { userInfo } = userLogin;
    const registerHandler = async (e) => {
        e.preventDefault();
        dispatch(register(name,email,password))
    }
    // useEffect(() => {
    //     if (userInfo != null) {
    //         navigate("/");
    //     }
    // }, [navigate, userInfo])
    if(loading)
       return <Loading />
    return (
        <div className='register-screen'>
            <h2>Register</h2>
            {message && <ErrorMessage variant="error">{message}</ErrorMessage> }
            <div>
                <input type='text' placeholder='Name' required onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Register' onClick={registerHandler} />
            </div>
        </div>
    )
}
