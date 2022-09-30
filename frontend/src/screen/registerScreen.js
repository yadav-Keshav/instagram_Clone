import React, { useState, useEffect } from 'react'

export default function RegisterScreen() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const registerHandler = () => {
        console.log(name, email, userName, password);
    }
    return (
        <div className='register-screen'>
            <h2>Register</h2>
            <div>
                <input type='text' placeholder='Name' required onChange={(e) => setName(e.target.value)} />
                <input type='text' placeholder='Username' required onChange={(e) => setUserName(e.target.value)} />
                <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Register' onClick={registerHandler} />
            </div>
        </div>
    )
}
