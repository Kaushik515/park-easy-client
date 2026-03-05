import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, resetPassword, updateUser } from '../api/api'
import { clearUser, setUser } from '../reducers/userReducer';
import './../css/createParking.scss'
import './../css/profile.scss'

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);


    // Edit/view mode state
    const [editMode, setEditMode] = useState(false);
    const [originalForm, setOriginalForm] = useState(null);
    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
        type: '',
        cash: false,
        interac: ''
    })

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    const [isUpdated, setIsUpdated] = useState(false)
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value });
        if (key === 'password') {
            setPasswordStrength(getPasswordStrength(value));
        }
    }

    // Password strength checker
    function getPasswordStrength(password) {
        if (!password) return '';
        if (password.length < 6) return 'Weak';
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) return 'Strong';
        if (password.length >= 8) return 'Medium';
        return 'Weak';
    }

    // Handle profile picture upload

    const handleUpdateUserPassword = () => {
        setIsUpdated(false)
        setError()

        // Prepare body for update
        const body = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            cash: form.cash,
            interac: form.interac
        };
        updateUser({ user_id: user?._id, body, handleUpdateUserSuccess, handleUpdateUserFailure })
        setEditMode(false);
    }

    const handleEdit = () => {
        setOriginalForm(form);
        setEditMode(true);
    }

    const handleCancel = () => {
        setForm(originalForm || form);
        setEditMode(false);
    }

    const handleUpdateUserSuccess = (data) => {
        dispatch(setUser({ ...user, ...data?.user }));
        setIsUpdated(true)
    }

    const handleUpdateUserFailure = (error) => {
        setError(error)
    }

    const handleResetPassword = () => {
        setIsUpdated(false)
        setError()
        console.log('form?.password ', form?.password);
        console.log('form?.confirmPassword ', form?.confirmPassword);
        if (form?.password !== form?.confirmPassword) {
            setError('New password and confirm password should be same')
        }
        else {
            const body = { password: form.password, cash: form.cash, interac: form.interac }
            resetPassword({ user_id: user?._id, body, handleResetPasswordSuccess, handleResetPasswordFailure })
        }
    }

    const handleResetPasswordSuccess = (data) => {
        setIsUpdated(true)
    }

    const handleResetPasswordFailure = (error) => {
        setError(error)
    }

    const handleDeleteProfile = () => {
        setIsUpdated(false)
        setError()

        const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
        if (!confirmed) {
            return;
        }

        deleteUser({ id: user?._id, handleDeleteUserSuccess, handleDeleteUserFailure })
    }

    const handleDeleteUserSuccess = () => {
        localStorage.removeItem('token')
        dispatch(clearUser())
        navigate('/login')
    }

    const handleDeleteUserFailure = (error) => {
        setError(error || 'Failed to delete profile')
    }

    useEffect(() => {
        setForm({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            type: user?.type || '',
            cash: user?.cash || false,
            interac: user?.interac || ''
        })
    }, [user])

    return (
        <div className='container py-5'>
            <div className='profile-card'>
                <h3 className='mb-4'>Manage Profile</h3>
                {isUpdated && <div className="alert alert-success" role="alert">Updated successfully!</div>}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {!editMode ? (
                    <>
                        <div className="mb-3 text-center">
                            {/* Profile photo removed */}
                        </div>
                        <div className="mb-3"><strong>Name:</strong> {form.name}</div>
                        <div className="mb-3"><strong>Email:</strong> {form.email}</div>
                        <div className="mb-3"><strong>Phone:</strong> {form.phone}</div>
                        <div className="mb-3"><strong>Type:</strong> {form.type}</div>
                        {user?.type === 'owner' && <>
                            <div className="mb-3"><strong>Accepts cash:</strong> {form.cash ? 'Yes' : 'No'}</div>
                            <div className="mb-3"><strong>Interac:</strong> {form.interac}</div>
                        </>}
                        <button className="btn btn-primary mt-4 mb-4 me-2" onClick={handleEdit}>Edit Profile</button>
                        <button className="btn btn-danger mt-4 mb-4" onClick={handleDeleteProfile}>Delete Profile</button>
                    </>
                ) : (
                    <>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={form?.name} onChange={(e) => handleFormChange({ key: 'name', value: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={form?.email} onChange={(e) => handleFormChange({ key: 'email', value: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" value={form?.phone} onChange={(e) => handleFormChange({ key: 'phone', value: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            {/* Profile photo upload removed */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type</label>
                            <input type="text" className="form-control" id="type" value={form?.type} disabled />
                        </div>
                        {user?.type === 'owner' && <>
                            <div className="mb-3 d-flex justify-content-between">
                                <label className="form-check-label" htmlFor="flexCheckDefault">Accepts cash</label>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={form?.cash} onChange={(e) => handleFormChange({ key: 'cash', value: e.target.checked })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="interac" className="form-label">Interac</label>
                                <input type="text" className="form-control" id="interac" value={form?.interac} onChange={(e) => handleFormChange({ key: 'interac', value: e.target.value })} />
                            </div>
                        </>}

                        {/* Change password section only in edit mode */}
                        <div className="mt-4 p-3" style={{ background: '#181c24', borderRadius: 10, border: '1px solid #23272f' }}>
                            <h4 className='mb-3'>Change Password</h4>
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input type={showCurrentPassword ? 'text' : 'password'} className="form-control" id="currentPassword" value={form?.currentPassword} onChange={(e) => handleFormChange({ key: 'currentPassword', value: e.target.value })} />
                                    <span style={{ position: 'absolute', right: 12, top: 10, cursor: 'pointer', color: '#8ecfff' }} onClick={() => setShowCurrentPassword(v => !v)}>
                                        {showCurrentPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input type={showNewPassword ? 'text' : 'password'} className="form-control" id="password" value={form?.password} onChange={(e) => handleFormChange({ key: 'password', value: e.target.value })} />
                                    <span style={{ position: 'absolute', right: 12, top: 10, cursor: 'pointer', color: '#8ecfff' }} onClick={() => setShowNewPassword(v => !v)}>
                                        {showNewPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                                {form.password && (
                                    <div style={{ fontSize: '0.95rem', marginTop: 4, color: passwordStrength === 'Strong' ? '#28a745' : passwordStrength === 'Medium' ? '#ffc107' : '#dc3545' }}>
                                        Strength: {passwordStrength}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" id="confirmPassword" value={form?.confirmPassword} onChange={(e) => handleFormChange({ key: 'confirmPassword', value: e.target.value })} />
                                    <span style={{ position: 'absolute', right: 12, top: 10, cursor: 'pointer', color: '#8ecfff' }} onClick={() => setShowConfirmPassword(v => !v)}>
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                                onClick={handleResetPassword}
                                disabled={
                                    !form.currentPassword ||
                                    !form.password ||
                                    !form.confirmPassword ||
                                    form.password !== form.confirmPassword ||
                                    passwordStrength === 'Weak'
                                }
                            >
                                Change Password
                            </button>
                        </div>
                        <button type="button" className="btn btn-success mt-4 mb-4 me-2" onClick={handleUpdateUserPassword}>Save</button>
                        <button type="button" className="btn btn-secondary mt-4 mb-4" onClick={handleCancel}>Cancel</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile