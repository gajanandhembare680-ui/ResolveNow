import React, { useState, useContext } from 'react';
import { FileText, PlusCircle, CheckCircle, XCircle, Clock, LayoutDashboard, LogOut, BarChart3, Check, AlertCircle, Trash2, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ComplaintContext } from '../context/ComplaintContext';
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import './../index.css';

const StudentDashboard = () => {
    const { complaints, addComplaint } = useContext(ComplaintContext);
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('submit');
    const [fetchedComplaints, setFetchedComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter complaints for the "current" student directly from the Firestore results
    const studentComplaints = fetchedComplaints;

    // Calculate stats
    const totalComplaints = studentComplaints.length;
    const pendingComplaints = studentComplaints.filter(c => c.status && c.status.toLowerCase() === 'pending').length;
    const acceptedComplaints = studentComplaints.filter(c => c.status && c.status.toLowerCase() === 'accepted').length;
    const resolvedComplaints = studentComplaints.filter(c => c.status && c.status.toLowerCase() === 'resolved').length;
    const rejectedComplaints = studentComplaints.filter(c => c.status && c.status.toLowerCase() === 'rejected').length;
    const unresolvedComplaints = studentComplaints.filter(c => c.status && c.status.toLowerCase() === 'unresolved').length;

    // Local form state
    const [formData, setFormData] = useState({
        title: '',
        category: 'Infrastructure',
        issue: ''
    });

    const [userName, setUserName] = useState('');

    React.useEffect(() => {
        const fetchUserData = async () => {
            if (!auth.currentUser) return;
            try {
                if (auth.currentUser.displayName) {
                    setUserName(auth.currentUser.displayName);
                } else {
                    const { getDoc } = await import("firebase/firestore");
                    const userDoc = await getDoc(doc(db, "user", auth.currentUser.uid));
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().name || 'Student');
                    } else {
                        setUserName('Student');
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserName('Student');
            }
        };
        fetchUserData();
    }, []);

    React.useEffect(() => {
        // Fetch complaints from Firestore
        const fetchComplaints = async () => {
            if (!auth.currentUser) return;

            try {
                const { getDocs, query, where } = await import("firebase/firestore");
                const q = query(collection(db, "complaints"), where("userId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);

                const complaintsData = [];
                querySnapshot.forEach((doc) => {
                    complaintsData.push({ id: doc.id, ...doc.data() });
                });

                // Sort by timestamp if available
                complaintsData.sort((a, b) => {
                    const timeA = a.date?.seconds || 0;
                    const timeB = b.date?.seconds || 0;
                    return timeA - timeB;
                });

                setFetchedComplaints(complaintsData);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [activeView]); // Re-fetch when view changes (e.g. after submit)

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.issue) return;

        try {
            await addDoc(collection(db, "complaints"), {
                title: formData.title,
                description: formData.issue,
                category: formData.category, // Kept to maintain form UI
                status: "pending",
                date: new Date(),
                userId: auth.currentUser.uid
            });

            console.log("Complaint submitted");

            // Clear form
            setFormData({ title: '', category: 'Infrastructure', issue: '' });

            // Switch to recent view to see the new complaint
            setActiveView('recent');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (complaintId) => {
        if (!window.confirm("Are you sure you want to delete this complaint? This action cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "complaints", complaintId));
            setFetchedComplaints(current => current.filter(c => c.id !== complaintId));
            console.log("Complaint deleted successfully");
        } catch (error) {
            console.error("Error deleting complaint:", error);
            alert("Failed to delete the complaint. Please try again.");
        }
    };

    const getStatusIcon = (status) => {
        const s = status ? status.toLowerCase() : '';
        switch (s) {
            case 'pending': return <Clock size={16} className="text-yellow-500" style={{ color: '#eab308' }} />;
            case 'accepted': return <Check size={16} className="text-blue-500" style={{ color: '#3b82f6' }} />;
            case 'resolved': return <CheckCircle size={16} className="text-green-500" style={{ color: '#22c55e' }} />;
            case 'rejected': return <XCircle size={16} className="text-red-500" style={{ color: '#ef4444' }} />;
            case 'unresolved': return <AlertCircle size={16} className="text-orange-500" style={{ color: '#f97316' }} />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        const s = status ? status.toLowerCase() : '';
        switch (s) {
            case 'pending': return { bg: '#fef9c3', text: '#a16207', border: '#fde047' };
            case 'accepted': return { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' };
            case 'resolved': return { bg: '#dcfce7', text: '#15803d', border: '#86efac' };
            case 'rejected': return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' };
            case 'unresolved': return { bg: '#ffedd5', text: '#c2410c', border: '#fdba74' };
            default: return { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return '';
        if (typeof dateValue === 'string') return dateValue;
        if (dateValue.toDate) {
            return dateValue.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        if (dateValue instanceof Date) {
            return dateValue.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return String(dateValue);
    };

    const StatCard = ({ title, count, icon: Icon, color, bg }) => (
        <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} />
            </div>
            <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{count}</h3>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            {/* Mobile Header & Overlay */}
            <div className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <div className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-primary)' }}>
                    <LayoutDashboard size={24} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Student Portal</h2>
                </div>
                <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`glass-panel dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '250px', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--accent-primary)' }}>
                    <LayoutDashboard size={24} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Student Portal</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setActiveView('submit'); setIsSidebarOpen(false); }}
                        className="link"
                        style={{
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: activeView === 'submit' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            borderRadius: '0.5rem',
                            color: activeView === 'submit' ? 'var(--accent-hover)' : 'var(--text-secondary)',
                            fontWeight: activeView === 'submit' ? '600' : 'normal'
                        }}
                    >
                        <PlusCircle size={20} /> Submit Complaint
                    </a>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setActiveView('recent'); setIsSidebarOpen(false); }}
                        className="link"
                        style={{
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: activeView === 'recent' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            borderRadius: '0.5rem',
                            color: activeView === 'recent' ? 'var(--accent-hover)' : 'var(--text-secondary)',
                            fontWeight: activeView === 'recent' ? '600' : 'normal'
                        }}
                    >
                        <FileText size={20} /> My Complaints
                    </a>
                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main" style={{ flex: 1, padding: '1rem 2rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Dynamic Title based on view */}
                    <h1 className="desktop-header-title" style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                        {activeView === 'submit' ? 'Submit a New Complaint' : 'My Complaints Overview'}
                    </h1>

                    {/* User Profile & Logout */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.6)', padding: '0.5rem 1rem', borderRadius: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.8)' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <User size={20} />
                            </div>
                            <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{userName || 'Loading...'}</span>
                        </div>
                        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fecaca'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2'; }}>
                            <LogOut size={18} /> <span className="hide-on-mobile">Logout</span>
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Submit Form View */}
                    {activeView === 'submit' && (
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Please fill out the form below to lodge a formal complaint. Your submission will be reviewed by an administrator.</p>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }} onSubmit={handleSubmit}>
                                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Title</label>
                                        <input
                                            type="text"
                                            placeholder="Brief description of the issue"
                                            className="input-field"
                                            style={{ paddingLeft: '1rem', width: '100%' }}
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                                        <select
                                            className="input-field"
                                            style={{ paddingLeft: '1rem', appearance: 'auto', width: '100%' }}
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Infrastructure">Infrastructure</option>
                                            <option value="Academic">Academic</option>
                                            <option value="Hostel">Hostel</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Details</label>
                                    <textarea
                                        placeholder="Provide more details about your complaint..."
                                        className="input-field"
                                        style={{ paddingLeft: '1rem', minHeight: '150px', resize: 'vertical', paddingTop: '0.75rem', width: '100%' }}
                                        value={formData.issue}
                                        onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2.5rem', alignSelf: 'flex-start' }}>
                                    <PlusCircle size={20} />
                                    Submit Complaint
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Recent Complaints View */}
                    {activeView === 'recent' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Overall Stats Section (Only shown in 'recent' view) */}
                            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                <StatCard title="Total" count={totalComplaints} icon={BarChart3} color="#3b82f6" bg="rgba(59, 130, 246, 0.2)" />
                                <StatCard title="Pending" count={pendingComplaints} icon={Clock} color="#eab308" bg="rgba(234, 179, 8, 0.2)" />
                                <StatCard title="Accepted" count={acceptedComplaints} icon={Check} color="#3b82f6" bg="rgba(59, 130, 246, 0.2)" />
                                <StatCard title="Resolved" count={resolvedComplaints} icon={CheckCircle} color="#22c55e" bg="rgba(34, 197, 94, 0.2)" />
                                <StatCard title="Rejected" count={rejectedComplaints} icon={XCircle} color="#ef4444" bg="rgba(239, 68, 68, 0.2)" />
                                <StatCard title="Unresolved" count={unresolvedComplaints} icon={AlertCircle} color="#f97316" bg="rgba(249, 115, 22, 0.2)" />
                            </div>

                            <div id="recent" className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Complaint History</h2>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total: {studentComplaints.length} entries</span>
                                </div>

                                {studentComplaints.length === 0 ? (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', minHeight: '300px' }}>
                                        <FileText size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                        <p style={{ fontSize: '1.1rem' }}>You haven't submitted any complaints yet.</p>
                                        <button
                                            className="btn-primary"
                                            style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem' }}
                                            onClick={() => setActiveView('submit')}
                                        >
                                            Submit your first complaint
                                        </button>
                                    </div>
                                ) : (
                                    <div className="complaints-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))', gap: '1rem' }}>
                                        {/* Sort complaints so newest is on top (assuming ascending ID means older) */}
                                        {[...studentComplaints].reverse().map(complaint => {
                                            const colors = getStatusColor(complaint.status);
                                            return (
                                                <div key={complaint.id} className="list-item-mobile" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.6)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.8)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                                                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)' }}
                                                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                                                >
                                                    <div style={{ maxWidth: '75%' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', padding: '0.15rem 0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '1rem' }}>ID: #{complaint.id}</span>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{formatDate(complaint.date)}</span>
                                                        </div>
                                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{complaint.title}</h3>
                                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{complaint.issue}</p>

                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-primary)', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.1)' }}>
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}></span>
                                                            {complaint.category || 'General'}
                                                        </span>
                                                    </div>

                                                    <div className="list-item-mobile-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '2rem',
                                                            background: colors.bg,
                                                            color: colors.text,
                                                            border: `1px solid ${colors.border}`,
                                                            fontWeight: '600',
                                                            fontSize: '0.875rem',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            {getStatusIcon(complaint.status)}
                                                            {complaint.status}
                                                        </div>
                                                        <button onClick={() => handleDelete(complaint.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} title="Delete Complaint" onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default StudentDashboard;
