import React, { useState } from 'react';
import { Mail, Lock, LogIn, Shield, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import './../index.css';

const Login = ({ role = "student" }) => {
    const navigate = useNavigate();
    const isAdmin = role === 'admin';
    const accentColor = isAdmin ? '#0f172a' : 'var(--accent-hover)';
    const btnClass = isAdmin ? '' : 'btn-primary';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        marginTop: '0.5rem'
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful:", userCredential.user);

            // Check if user role matches the login portal role
            const userDoc = await getDoc(doc(db, "user", userCredential.user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role !== role) {
                    await signOut(auth); // Sign out the user
                    setError(`Access denied. You are registered as a ${userData.role}, not an ${role}.`);
                    setLoading(false);
                    return;
                }
            } else {
                await signOut(auth);
                setError("User data not found. Access denied.");
                setLoading(false);
                return;
            }

            if (isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (err) {
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
                setError('Invalid email or password.');
            } else {
                setError('An error occurred during login. Please try again.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: accentColor }}>
                        {isAdmin ? <Shield size={48} /> : <User size={48} />}
                    </div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem', color: accentColor }}>
                        {isAdmin ? 'Admin Portal' : 'Student Portal'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Log in to access your dashboard</p>
                </div>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleLogin}>
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

                    <div style={{ position: 'relative' }}>
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: isAdmin ? '#0f172a' : 'var(--accent-primary)' }} />
                            <span style={{ color: 'var(--text-secondary)' }}>Remember me</span>
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className={isAdmin ? '' : 'btn-primary'} style={isAdmin ? adminBtnStyle : { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <LogIn size={20} />
                        <span>{loading ? 'Logging in...' : 'Login'}</span>
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/role-selection" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back to Role Selection</Link>
                    </div>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to={isAdmin ? '/admin/signup' : '/student/signup'} className="link" style={{ fontWeight: '600', color: isAdmin ? '#0f172a' : '' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
