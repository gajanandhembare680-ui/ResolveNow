import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#334155'
        }}>
            {/* Header */}
            <header className="policy-header" style={{
                background: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a' }}>
                    <ShieldCheck size={28} style={{ color: '#3b82f6' }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>ResolveNow</span>
                </div>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s'
                }}
                    onMouseOver={(e) => e.target.style.color = '#0f172a'}
                    onMouseOut={(e) => e.target.style.color = '#64748b'}>
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </header>

            {/* Content Container */}
            <main className="policy-main" style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '4rem 2rem',
                background: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                borderRadius: '1rem',
                marginTop: '3rem',
                marginBottom: '4rem'
            }}>
                <h1 className="policy-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Terms of Service</h1>
                <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1rem' }}>Last updated: March 10, 2026</p>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        By accessing or using ResolveNow, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>2. Use License</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        Permission is granted to temporarily download one copy of the materials (information or software) on ResolveNow's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul style={{ lineHeight: '1.7', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>modify or copy the materials;</li>
                        <li style={{ marginBottom: '0.5rem' }}>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li style={{ marginBottom: '0.5rem' }}>attempt to decompile or reverse engineer any software contained on ResolveNow's website;</li>
                        <li style={{ marginBottom: '0.5rem' }}>remove any copyright or other proprietary notations from the materials; or</li>
                        <li style={{ marginBottom: '0.5rem' }}>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>3. Disclaimer</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        The materials on ResolveNow's website are provided on an 'as is' basis. ResolveNow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>4. Limitations</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        In no event shall ResolveNow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ResolveNow's website, even if ResolveNow or a ResolveNow authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>5. User Responsibilities</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        As a user, you agree not to submit false claims, misuse the complaint system, or engage in any behavior that disrupts the normal functioning of the platform. Violation of these rules may result in account termination.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default TermsOfService;
