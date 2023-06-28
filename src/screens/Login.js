import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const [credentials, setCredentials] = useState({
        
        email: '',
        password: '',
        
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   
                    email: credentials.email,
                    password: credentials.password,
                    
                }),
            });
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert('Enter Valid Credentials');
            }
            if (json.success) {
                localStorage.setItem("userEmail", credentials.email)
                localStorage.setItem("authToken", json.authToken)
                console.log(localStorage.getItem("authToken"))
                navigate("/")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
  return (
    <div>
        <div className='container'>
                <form onSubmit={handleSubmit}>
                   
                    <div className='form-group'>
                        <label htmlFor='email'>Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={credentials.email}
                            id='email'
                            aria-describedby='emailHelp'
                            placeholder='Enter email'
                            onChange={handleChange}
                        />
                        <small id='emailHelp' className='form-text text-muted'>
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={credentials.password}
                            id='password'
                            placeholder='Password'
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className='m-3 btn btn-success'>
                        Login
                    </button>
                    <Link to='/createUser' className='m-3 btn btn-danger'>
                        Register
                    </Link>
                </form>
            </div>
    </div>
  )
}
