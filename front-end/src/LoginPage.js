import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/login', loginData);
            const {success, message} = response.data;
            if(success){
                console.log('Logged in successfully');
            }else {
                console.log(message);
            }
        }catch(error){
            console.error('login error', error);
        };
        setLoginData({
            username: '',
            password: ''
        })
    }
    const handleLoginChange = (e) => {
        const {name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]:value
        }))
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLoginSubmit}>
            <input type='text'
            name='username'
            placeholder='username'
            value={loginData.username}
            onChange={handleLoginChange}
            required />
             <input type='password'
            name='password'
            placeholder='password'
            value={loginData.password}
            onChange={handleLoginChange}
            required />
            <button type='submit'>Login</button>
            <p>Not Registered yet?
                <Link to='/registration'>Register here</Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage