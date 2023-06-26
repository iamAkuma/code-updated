import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: '',
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation,
                }),
            });
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert('Enter Valid Credentials');
            }
            if (json.success) {
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
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={credentials.name}
                            placeholder='Enter name'
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            className='form-control'
                            name='geolocation'
                            value={credentials.geolocation}
                            id='address'
                            placeholder='Address'
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className='m-3 btn btn-success'>
                        Submit
                    </button>
                    <Link to='/login' className='m-3 btn btn-danger'>
                        Already a User
                    </Link>
                </form>
            </div>
        </>
    );
}
