import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
                <h1 className="policy-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Privacy Policy</h1>
                <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1rem' }}>Last updated: March 10, 2026</p>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>1. Introduction</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        Welcome to ResolveNow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>2. Data We Collect</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul style={{ lineHeight: '1.7', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Contact Data:</strong> includes email address, telephone numbers.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> includes information about how you use our application and services.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul style={{ lineHeight: '1.7', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., handling your complaints).</li>
                        <li style={{ marginBottom: '0.5rem' }}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>4. Data Security</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>5. Contact Us</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        If you have any questions about this privacy policy, please contact us at privacy@resolvenow.edu.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
