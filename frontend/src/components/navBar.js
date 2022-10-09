import React from 'react';
import downlod from '../../src/download.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/action/authAction';
export default function Navbar() {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const logOutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    return (
        <div className="nav-wrapper">
            <ul className='left'>
                <li><i className="fa fa-bars"></i></li>
            </ul>
            <ul className='middle'>
                <li><a href='/' className='brand-logo'>Instagram</a></li>
                <li>
                    <form className="example" >
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </li>
            </ul>
            {
                userInfo == null ? (
                    <ul className="right ">

                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>) : (
                    <ul className="right ">
                        <li><a href='/create-post' style={{cursor:'pointer',fontSize:'32px'}} >+</a></li>
                        <li><a href="/profile" className='profile'><img src={downlod} alt="profile" /></a></li>
                        <li><a onClick={logOutHandler} style={{cursor:'pointer'}} >Logout</a></li>
                    </ul>)
            }
        </div>
    )
}


