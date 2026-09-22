import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import './../index.css';

const Signup = ({ role = "student" }) => {
    const navigate = useNavigate();
    const isAdmin = role === 'admin';
    const accentColor = isAdmin ? '#0f172a' : 'var(--accent-hover)';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Custom button style for admin if needed to match dark theme, otherwise use primary
    const adminBtnStyle = {
        width: '100%',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        border: 'none',
        background: '#0f172a',
        color: 'white',
        fontWeight: '600',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem'
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setLoading(true);

            // If registering as admin, check if one already exists
            if (isAdmin) {
                const adminQuery = query(collection(db, "user"), where("role", "==", "admin"));
                const adminSnapshot = await getDocs(adminQuery);

                if (!adminSnapshot.empty) {
                    setError('An administrator account already exists. Only one admin is allowed.');
                    setLoading(false);
                    return;
                }
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            await setDoc(doc(db, "user", user.uid), {
                name: name,
                email: email,
                role: role
            });

            console.log("User created and saved in Firestore");

            if (isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (error) {
            console.log(error.message);
            if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (error.code === 'auth/weak-password') {
                setError('Password is too weak. Please use a stronger password.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: accentColor }}>
                        {isAdmin ? <Shield size={48} /> : <UserPlus size={48} />}
                    </div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem', color: accentColor }}>
                        {isAdmin ? 'Admin Registration' : 'Student Registration'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{isAdmin ? 'Register to manage the portal' : 'Join us to submit your complaints'}</p>
                </div>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSignup}>
                    <div style={{ position: 'relative' }}>
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {isAdmin && (
                        <div style={{ position: 'relative' }}>
                            <Shield className="input-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Admin Invitation Code"
                                className="input-field"
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Lock className="input-icon" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            style={{ paddingRight: '2.5rem' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock className="input-icon" size={20} />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="input-field"
                            style={{ paddingRight: '2.5rem' }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0
                            }}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className={isAdmin ? '' : 'btn-primary'} style={isAdmin ? adminBtnStyle : { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <UserPlus size={20} />
                        <span>{loading ? 'Signing Up...' : 'Sign Up'}</span>
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/role-selection" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back to Role Selection</Link>
                    </div>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to={isAdmin ? '/admin/login' : '/student/login'} className="link" style={{ fontWeight: '600', color: isAdmin ? '#0f172a' : '' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
