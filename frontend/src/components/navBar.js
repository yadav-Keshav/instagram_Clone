import React, { useEffect } from 'react';
import downlod from '../../src/download.jpg';
export default function Navbar() {
    useEffect(() => {
    })
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

            <ul className="right ">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a >Logout</a></li>
                <li><a href="/profile" className='profile'><img src={downlod} /></a></li>
            </ul>
        </div>
    )
}


