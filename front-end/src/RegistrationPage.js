import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function RegistrationPage() {
    const [registrationData, setRegistrationData] = useState({
        username: '', 
        password: ''
    });
    const handleRegistratonChange = (e) =>{
        const {name, value} = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value
        }))
     }
    const handleRegistrationSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/register', registrationData);
            console.log(response.data);
        }catch(e){
            console.log(e);
        }
        setRegistrationData({
            username: '',
            password: ''
        })
    }
  return (
    <div>
    <h1>Registration Page</h1>
        <form onSubmit={handleRegistrationSubmit}>
            <input type='text'
            name='username'
            placeholder='username'
            onChange={handleRegistratonChange}
            value={registrationData.username}
            required/>
             <input type='password'
            name='password'
            placeholder='password'
            onChange={handleRegistratonChange}
            value={registrationData.password}
            required/>
            <button type='submit'>Register</button>
            <p>Already Registered?
                <Link to='/login'>Login Here</Link>
            </p>
        </form>    
    </div>
  )
}

export default RegistrationPage