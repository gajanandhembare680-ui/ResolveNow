import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Introduction = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            {/* Navbar */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a' }}>
                    <ShieldCheck size={32} style={{ color: '#3b82f6' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>ResolveIt</span>
                </div>
                <Link to="/role-selection" style={{
                    padding: '0.5rem 1.25rem',
                    background: '#ffffff',
                    color: '#0f172a',
                    borderRadius: '2rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease'
                }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}>
                    Sign In
                </Link>
            </nav>

            {/* Hero Section */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#2563eb',
                    borderRadius: '2rem',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    ✨ The New Standard for Campus Management
                </div>

                <h1 style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: '800',
                    color: '#0f172a',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    maxWidth: '800px',
                    letterSpacing: '-0.025em'
                }}>
                    A smarter way to handle <br />
                    <span style={{
                        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>campus complaints.</span>
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: '#475569',
                    maxWidth: '600px',
                    marginBottom: '3rem',
                    lineHeight: '1.6'
                }}>
                    Streamline your institution's issue resolution process. Empower students to report problems easily and give administrators the tools to solve them efficiently.
                </p>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/role-selection" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        background: '#2563eb',
                        color: '#ffffff',
                        borderRadius: '3rem',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                        transition: 'all 0.2s ease'
                    }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#1d4ed8'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#2563eb'; }}>
                        Get Started <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Features */}
                <div style={{
                    marginTop: '5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1000px'
                }}>
                    {[
                        { icon: Zap, title: 'Lightning Fast', desc: 'Submit complaints in seconds with an intuitive, seamless interface.' },
                        { icon: ShieldCheck, title: 'Secure & Transparent', desc: 'Track your complaint status in real-time. Full transparency from start to finish.' },
                        { icon: BarChart3, title: 'Powerful Dashboard', desc: 'Administrators get rich analytics overviews to manage and resolve issues at scale.' }
                    ].map((feature, idx) => (
                        <div key={idx} style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(12px)',
                            padding: '2rem',
                            borderRadius: '1.5rem',
                            textAlign: 'left',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <feature.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* How it Works Section */}
                <div style={{
                    marginTop: '6rem',
                    width: '100%',
                    maxWidth: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#0f172a',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        letterSpacing: '-0.025em'
                    }}>
                        How <span style={{ color: '#2563eb' }}>ResolveIt</span> Works
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '2rem',
                        width: '100%'
                    }}>
                        {[
                            { step: '1', title: 'Submit Issue', desc: 'Students log in and submit their complaints easily through the portal.' },
                            { step: '2', title: 'Admin Review', desc: 'Administrators review the submitted issues and analyze them.' },
                            { step: '3', title: 'Resolution', desc: 'Dedicated teams work on resolving the specific campus issues.' },
                            { step: '4', title: 'Status Update', desc: 'Students get real-time updates when their issue is resolved.' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(12px)',
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.2s ease',
                            }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#eff6ff',
                                    color: '#2563eb',
                                    border: '2px solid #bfdbfe',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    fontWeight: '800',
                                    marginBottom: '1.25rem'
                                }}>
                                    {item.step}
                                </div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                background: '#0f172a',
                color: '#94a3b8',
                padding: '4rem 2rem 2rem 2rem',
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '3rem',
                    width: '100%',
                    maxWidth: '1000px',
                    marginBottom: '3rem'
                }}>
                    <div style={{ flex: '1 1 250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ffffff', marginBottom: '1rem' }}>
                            <ShieldCheck size={28} style={{ color: '#3b82f6' }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>ResolveIt</span>
                        </div>
                        <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                            Making campus life better, one resolved issue at a time. Empowering students and administrators since 2026.
                        </p>
                    </div>

                    <div style={{ flex: '1 1 150px' }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1.25rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/role-selection" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Home</Link></li>
                            <li><Link to="/role-selection" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Submit Issue</Link></li>
                            <li><Link to="/role-selection" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Admin Login</Link></li>
                        </ul>
                    </div>

                    <div style={{ flex: '1 1 150px' }}>
                        <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1.25rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Privacy Policy</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Terms of Service</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    width: '100%',
                    maxWidth: '1000px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.875rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} ResolveIt. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Twitter</a>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>LinkedIn</a>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Introduction;
