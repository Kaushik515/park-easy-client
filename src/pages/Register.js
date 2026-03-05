import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { register } from '../api/api'
import './../css/auth.scss'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState()

    const navigate = useNavigate()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[1-9]\d{9,14}$/
    const normalizedPhone = phone.replace(/[\s()-]/g, '')
    const isEmailValid = emailRegex.test(email.trim())
    const isPhoneValid = phoneRegex.test(normalizedPhone)

    const passwordChecks = {
        minLength: password.length >= 8,
        upperCase: /[A-Z]/.test(password),
        lowerCase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password),
    }
    const isPasswordStrong = Object.values(passwordChecks).every(Boolean)

    const handleRegister = () => {
        setIsRegistered(false)
        setError()

        if (!name.trim() || !type) {
            return setError('Please fill all required fields')
        }
        if (!isEmailValid) {
            return setError('Please enter a valid email address')
        }
        if (!isPhoneValid) {
            return setError('Please enter a valid phone number (10-15 digits, optional +)')
        }
        if (!isPasswordStrong) {
            return setError('Please choose a stronger password using all suggested rules')
        }

        register({ name, email: email.trim().toLowerCase(), phone: normalizedPhone, password, type, handleRegisterSuccess, handleRegisterFailure })
    }

    const handleRegisterSuccess = () => {
        setIsRegistered(true)
        alert("Registration successful")
        navigate('/login')
    }

    const handleRegisterFailure = (error) => {
        
        setError(error)
    }

    return (
        <div className='auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign up</h3>
                {/* {isRegistered && <div className="alert alert-success" role="alert">
                    Registration successful!
                </div>} */}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {email.length > 0 && (
                        <div className={`form-text ${isEmailValid ? 'text-success' : 'text-danger'}`}>
                            {isEmailValid ? 'Valid email format' : 'Enter a valid email address'}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone number</label>
                    <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+919876543210" required />
                    {phone.length > 0 && (
                        <div className={`form-text ${isPhoneValid ? 'text-success' : 'text-danger'}`}>
                            {isPhoneValid ? 'Valid phone number' : 'Use 10-15 digits, optional +'}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className='input-group'>
                        <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type='button' className='btn btn-outline-secondary auth-toggle-btn' onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {password.length > 0 && (
                        <div className='auth-helper mt-2'>
                            <div className={passwordChecks.minLength ? 'text-success' : 'text-danger'}>• At least 8 characters</div>
                            <div className={passwordChecks.upperCase ? 'text-success' : 'text-danger'}>• One uppercase letter</div>
                            <div className={passwordChecks.lowerCase ? 'text-success' : 'text-danger'}>• One lowercase letter</div>
                            <div className={passwordChecks.number ? 'text-success' : 'text-danger'}>• One number</div>
                            <div className={passwordChecks.specialChar ? 'text-success' : 'text-danger'}>• One special character</div>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Type</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="owner">Owner</option>
                        <option value="seeker">Seeker</option>
                    </select>
                </div>
                <div className='d-flex justify-content-between'>
                    Are you a existing user?<Link to='/login'>Sign in</Link>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleRegister()}>Register</button>
            </div>
        </div>
    )
}

export default Register