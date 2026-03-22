import React from 'react';
import { User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './../index.css';

const RoleSelection = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '3rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>Welcome to ResolveNow</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Please select your role to continue</p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <Link to="/student/login" style={{
                        flex: '1 1 200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: '1rem',
                        textDecoration: 'none',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                        }}
                    >
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Student</h2>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Submit and track complaints</span>
                    </Link>

                    <Link to="/admin/login" style={{
                        flex: '1 1 200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: '1rem',
                        textDecoration: 'none',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = '#0f172a';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                        }}
                    >
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Administrator</h2>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Review and manage complaints</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
