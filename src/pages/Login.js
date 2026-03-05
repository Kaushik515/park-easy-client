import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import { setUser } from '../reducers/userReducer'
import './../css/auth.scss'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const trimmedEmail = email.trim()
    const isEmailValid = emailRegex.test(trimmedEmail)

    // Login API call with callback functions for handling response
    const handleLogin = () => {
        setError()
        if (!trimmedEmail) {
            return setError('Please enter email')
        }
        if (!isEmailValid) {
            return setError('Please enter a valid email address')
        }
        if (!password) {
            return setError('Please enter password')
        }

        login({ email: trimmedEmail.toLowerCase(), password, handleLoginSuccess, handleLoginFailure })
    }

    const handleLoginSuccess = (data) => {
        localStorage.setItem("token", data?.token);
        dispatch(setUser({ ...data?.user, token: data?.token }));
        navigate('/')
    }

    const handleLoginFailure = (error) => {
        setError(error)
    }

    return (
        <div className='container-fluid auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign in</h3>
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' required />
                    {trimmedEmail.length > 0 && (
                        <div className={`form-text ${isEmailValid ? 'text-success' : 'text-danger'}`}>
                            {isEmailValid ? 'Valid email format' : 'Enter a valid email address'}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <div className='input-group'>
                        <input type={showPassword ? 'text' : 'password'} className="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type='button' className='btn btn-outline-secondary auth-toggle-btn' onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    Are you a new user?<Link to='/register'>Create account</Link>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleLogin()}>Login</button>
            </div>
        </div>
    )
}

export default Login
