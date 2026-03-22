import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
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
                <h1 className="policy-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Cookie Policy</h1>
                <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1rem' }}>Last updated: March 10, 2026</p>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>1. What Are Cookies</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>2. How We Use Cookies</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>3. The Cookies We Set</h2>
                    <ul style={{ lineHeight: '1.7', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>4. Third Party Cookies</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:
                    </p>
                    <ul style={{ lineHeight: '1.7', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
                        <li style={{ marginBottom: '0.5rem' }}>From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>5. Disabling Cookies</h2>
                    <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default CookiePolicy;
