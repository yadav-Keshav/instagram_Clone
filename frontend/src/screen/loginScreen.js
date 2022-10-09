import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/action/authAction';
import Loading from '../components/loading';
import ErrorMessage from '../components/message';
export default function LoginScreen() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, error, loading } = userLogin;
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    useEffect(() => {
        if (userInfo != null) {
            navigate("/");
        }
    }, [navigate, userInfo])
    if (loading) {
        return <Loading />
    }
    return (
        <div className='register-screen'>
            <h2>Login</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form>
                <input type='text' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Login' onClick={loginHandler} />
            </form>
        </div>
    )
}
