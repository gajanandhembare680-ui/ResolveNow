import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Menu, X } from 'lucide-react';

const Introduction = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            {/* Navbar */}
            <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a' }}>
                    <ShieldCheck size={32} style={{ color: '#3b82f6' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>ResolveIt</span>
                </div>

                {/* Desktop Menu */}
                <div className="intro-desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/privacy-policy" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#0f172a'} onMouseOut={(e) => e.target.style.color = '#475569'}>Privacy Policy</Link>
                    <Link to="/terms-of-service" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#0f172a'} onMouseOut={(e) => e.target.style.color = '#475569'}>Terms of Service</Link>
                    <Link to="/cookie-policy" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#0f172a'} onMouseOut={(e) => e.target.style.color = '#475569'}>Cookie Policy</Link>
                    <Link to="/role-selection" style={{
                        padding: '0.5rem 1.25rem',
                        background: '#ffffff',
                        color: '#0f172a',
                        borderRadius: '2rem',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        transition: 'all 0.2s ease',
                        marginLeft: '0.5rem'
                    }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}>
                        Sign In
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="intro-mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a', display: 'none' }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="intro-mobile-menu" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: '#ffffff',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        borderBottom: '1px solid #e2e8f0',
                        zIndex: 50
                    }}>
                        <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem', padding: '0.5rem 0' }}>Privacy Policy</Link>
                        <Link to="/terms-of-service" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem', padding: '0.5rem 0' }}>Terms of Service</Link>
                        <Link to="/cookie-policy" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem', padding: '0.5rem 0' }}>Cookie Policy</Link>
                        <Link to="/role-selection" onClick={() => setIsMenuOpen(false)} style={{
                            padding: '0.75rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            borderRadius: '0.5rem',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            textAlign: 'center',
                            marginTop: '0.5rem'
                        }}>
                            Sign In
                        </Link>
                    </div>
                )}
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

                {/* Disadvantages of Manual Process */}
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
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        letterSpacing: '-0.025em'
                    }}>
                        Why <span style={{ color: '#ef4444' }}>Manual</span> Processes Fail
                    </h2>
                    <p style={{
                        fontSize: '1.15rem',
                        color: '#475569',
                        maxWidth: '700px',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        lineHeight: '1.6'
                    }}>
                        Traditional methods of handling campus complaints are outdated and frustrating for everyone involved.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        width: '100%',
                        overflowX: 'auto',
                        paddingBottom: '1rem'
                    }}>
                        {[
                            { title: 'Wait Times', desc: 'Action is delayed across departments because issues pile up faster than paper can travel.', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5' },
                            { title: 'Black Box effect', desc: 'The moment a complaint is filed, it vanishes. Users have no idea when and if they will be heard.', color: '#f97316', bg: '#fff7ed', border: '#fdba74' },
                            { title: 'Missing Documents', desc: 'Critical details, reports, and photos go missing when dealing with physical or messy inbox systems.', color: '#0ea5e9', bg: '#f0f9ff', border: '#7dd3fc' },
                            { title: 'Admin Burnout', desc: 'Teams are overwhelmed manually tracking and delegating issues, reducing time spent actually solving them.', color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                background: item.bg,
                                padding: '1.75rem 1.5rem',
                                borderRadius: '1.25rem',
                                borderTop: `4px solid ${item.color}`,
                                borderLeft: `1px solid ${item.border}`,
                                borderRight: `1px solid ${item.border}`,
                                borderBottom: `1px solid ${item.border}`,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                position: 'relative',
                                overflow: 'hidden',
                                minWidth: '220px',
                                height: '100%'
                            }}
                                onMouseOver={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(-5px)'; 
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                                }}
                                onMouseOut={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(0)'; 
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                                }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, right: 0, 
                                    width: '120px', height: '120px', 
                                    background: `radial-gradient(circle at top right, ${item.color}15, transparent 70%)`,
                                    pointerEvents: 'none'
                                }} />
                                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.2 }}>{item.title}</h3>
                                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ResolveIt Section (Features) */}
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
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        letterSpacing: '-0.025em'
                    }}>
                        Why Use <span style={{ color: '#2563eb' }}>ResolveIt?</span>
                    </h2>
                    <p style={{
                        fontSize: '1.15rem',
                        color: '#475569',
                        maxWidth: '700px',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        lineHeight: '1.6'
                    }}>
                        We replace chaos with clarity, providing a dedicated digital platform to manage issues from submission to resolution.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        width: '100%',
                        overflowX: 'auto',
                        paddingBottom: '1rem'
                    }}>
                        {[
                            { icon: Zap, title: 'Lightning Fast', desc: 'Submit complaints in seconds with an intuitive, seamless interface.' },
                            { icon: ShieldCheck, title: 'Secure & Transparent', desc: 'Track your complaint status in real-time. Full transparency from start to finish.' },
                            { icon: BarChart3, title: 'Powerful Dashboard', desc: 'Administrators get rich analytics overviews to manage and resolve issues at scale.' },
                            { icon: ShieldCheck, title: 'Strict Privacy', desc: 'Your complaints are 100% confidential. Students cannot view or access issues submitted by others.' }
                        ].map((feature, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(12px)',
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                textAlign: 'left',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                minWidth: '220px',
                                height: '100%'
                            }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>{feature.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: '1.6' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
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
                        <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1.25rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Cookie Policy</Link></li>
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
                </div>
            </footer>
        </div>
    );
};

export default Introduction;
