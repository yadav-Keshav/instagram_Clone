import React, { useState } from 'react'

export default function LoginScreen() {
    const [credential, setCredential] = useState();
    const [password, setPassword] = useState();
    const loginHandler = () => {
        console.log(credential, password);
    }
    return (
        <div className='register-screen'>
            <h2>Login</h2>
            <form>
                <input type='text' placeholder='Email or Username' required onChange={(e) => setCredential(e.target.value)} />
                <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Login' onClick={loginHandler} />
            </form>
        </div>
    )
}
