import React, { useContext, useState } from 'react';
import { LayoutDashboard, Users, CheckSquare, XSquare, LogOut, Check, X, Clock, CheckCircle, XCircle, BarChart3, FileText, AlertCircle, Trash2, Search, Filter, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { collection, query, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import './../index.css';

const AdminDashboard = () => {
    // Using local state bound to Firestore instead of Context
    const [complaints, setComplaints] = useState([]);
    const [activeView, setActiveView] = useState('management');
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter and Sort states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    React.useEffect(() => {
        const fetchAllComplaints = async () => {
            try {
                const q = query(collection(db, "complaints"));
                const querySnapshot = await getDocs(q);

                const complaintsData = [];
                querySnapshot.forEach((docSnap) => {
                    complaintsData.push({ id: docSnap.id, ...docSnap.data() });
                });

                // Sort by timestamp if available
                complaintsData.sort((a, b) => {
                    const timeA = a.date?.seconds || 0;
                    const timeB = b.date?.seconds || 0;
                    return timeB - timeA; // Newest first
                });

                setComplaints(complaintsData);
            } catch (error) {
                console.error("Error fetching all complaints:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllComplaints();
    }, []);

    const updateComplaintStatus = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "complaints", id), {
                status: newStatus
            });

            // Update local state instantly
            setComplaints(current =>
                current.map(c => c.id === id ? { ...c, status: newStatus } : c)
            );
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;

        try {
            await deleteDoc(doc(db, "complaints", id));
            setComplaints(current => current.filter(c => c.id !== id));
        } catch (error) {
            console.error("Error deleting complaint:", error);
            alert("Failed to delete complaint");
        }
    };

    const actionComplaints = complaints.filter(c => c.status && (c.status.toLowerCase() === 'pending' || c.status.toLowerCase() === 'accepted'));
    const pendingComplaints = complaints.filter(c => c.status && c.status.toLowerCase() === 'pending');
    const acceptedComplaints = complaints.filter(c => c.status && c.status.toLowerCase() === 'accepted');
    const rejectedComplaints = complaints.filter(c => c.status && c.status.toLowerCase() === 'rejected');
    const totalComplaints = complaints.length;

    const StatCard = ({ title, count, icon: Icon, color, bg }) => (
        <div style={{ flex: 1, padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={26} />
            </div>
            <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b', marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: 1 }}>{count}</h3>
            </div>
        </div>
    );

    const getStatusIcon = (status) => {
        const s = status ? status.toLowerCase() : '';
        switch (s) {
            case 'pending': return <Clock size={16} />;
            case 'accepted': return <Check size={16} />;
            case 'resolved': return <CheckCircle size={16} />;
            case 'rejected': return <XCircle size={16} />;
            case 'unresolved': return <AlertCircle size={16} />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        const s = status ? status.toLowerCase() : '';
        switch (s) {
            case 'pending': return { bg: '#fef3c7', text: '#d97706', border: '#fde68a' };
            case 'accepted': return { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe' };
            case 'resolved': return { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' };
            case 'rejected': return { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' };
            case 'unresolved': return { bg: '#ffedd5', text: '#ea580c', border: '#fed7aa' };
            default: return { bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' };
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

    const uniqueCategories = ['All', ...new Set(complaints.map(c => c.category || 'General'))];

    const filteredHistoryComplaints = complaints.filter(c => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = (c.title && c.title.toLowerCase().includes(searchLower)) ||
            (c.id && c.id.toLowerCase().includes(searchLower));
        const matchesStatus = filterStatus === 'All' || (c.status && c.status.toLowerCase() === filterStatus.toLowerCase());
        const category = c.category || 'General';
        const matchesCategory = filterCategory === 'All' || category === filterCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
        const timeA = a.date?.seconds || 0;
        const timeB = b.date?.seconds || 0;
        return sortBy === 'Newest' ? timeB - timeA : timeA - timeB;
    });


    return (
        <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Mobile Header & Overlay */}
            <div className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <div className="mobile-header" style={{ background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#2563eb' }}>
                    <LayoutDashboard size={24} />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.025em' }}>Admin Portal</h2>
                </div>
                <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '260px', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRadius: '1rem', background: '#ffffff', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', color: '#2563eb' }}>
                    <LayoutDashboard size={28} />
                    <h2 style={{ fontSize: '1.35rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Admin Portal</h2>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('management'); setIsSidebarOpen(false); }} style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: activeView === 'management' ? '#eff6ff' : 'transparent', borderRadius: '0.75rem', color: activeView === 'management' ? '#2563eb' : '#64748b', fontWeight: activeView === 'management' ? '600' : '500', textDecoration: 'none', transition: 'all 0.2s' }}>
                        <CheckSquare size={20} /> Complaint Management
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('all'); setIsSidebarOpen(false); }} style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: activeView === 'all' ? '#eff6ff' : 'transparent', borderRadius: '0.75rem', color: activeView === 'all' ? '#2563eb' : '#64748b', fontWeight: activeView === 'all' ? '600' : '500', textDecoration: 'none', transition: 'all 0.2s' }}>
                        <Users size={20} /> All Complaints
                    </a>
                </nav>
                <Link to="/" style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444', marginTop: 'auto', textDecoration: 'none', fontWeight: '500', borderRadius: '0.75rem', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <LogOut size={20} /> Logout
                </Link>
            </aside>

            <main className="dashboard-main" style={{ flex: 1, padding: '2rem 3rem 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
                {activeView === 'management' && (
                    <>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h1 className="desktop-header-title" style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em' }}>Complaint Management</h1>
                                <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>You have <span style={{ fontWeight: '700', color: '#2563eb' }}>{actionComplaints.length}</span> complaints requiring action ({pendingComplaints.length} pending, {acceptedComplaints.length} in progress).</p>
                            </div>
                        </header>
                        {actionComplaints.length === 0 ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', minHeight: '400px', background: '#ffffff', borderRadius: '1rem', border: '1px dashed #cbd5e1' }}>
                                <CheckSquare size={72} style={{ opacity: 0.5, marginBottom: '1.5rem', color: '#2563eb' }} />
                                <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>No action required. Caught up!</p>
                            </div>
                        ) : (
                            <div className="admin-management-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                                {actionComplaints.map(complaint => {
                                    const colors = getStatusColor(complaint.status);
                                    return (
                                        <div key={complaint.id} style={{ padding: '1.75rem', borderRadius: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>{complaint.student}</h3>
                                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{complaint.category || 'General'} • {formatDate(complaint.date)}</span>
                                                </div>
                                                <span style={{ background: colors.bg, color: colors.text, padding: '0.35rem 0.85rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: '700', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    {getStatusIcon(complaint.status)} {complaint.status}
                                                </span>
                                            </div>
                                            <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{complaint.title}</h4>
                                                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{complaint.issue}</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                                                {complaint.status && complaint.status.toLowerCase() === 'pending' && (
                                                    <>
                                                        <button onClick={() => updateComplaintStatus(complaint.id, 'accepted')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', background: '#2563eb', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', minWidth: '100px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
                                                            <Check size={18} /> Accept
                                                        </button>
                                                        <button onClick={() => updateComplaintStatus(complaint.id, 'rejected')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', minWidth: '100px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}>
                                                            <X size={18} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                                {complaint.status && complaint.status.toLowerCase() === 'accepted' && (
                                                    <>
                                                        <button onClick={() => updateComplaintStatus(complaint.id, 'resolved')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 0.25rem', borderRadius: '0.75rem', fontSize: '0.85rem', background: '#16a34a', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', minWidth: '80px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}>
                                                            <CheckCircle size={16} /> Resolve
                                                        </button>
                                                        <button onClick={() => updateComplaintStatus(complaint.id, 'unresolved')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 0.25rem', borderRadius: '0.75rem', fontSize: '0.85rem', background: '#ea580c', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', minWidth: '80px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c2410c'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}>
                                                            <AlertCircle size={16} /> Unresolve
                                                        </button>
                                                        <button onClick={() => updateComplaintStatus(complaint.id, 'rejected')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 0.25rem', borderRadius: '0.75rem', fontSize: '0.85rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', minWidth: '80px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}>
                                                            <X size={16} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </>
                )}

                {activeView === 'all' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0 0 0' }}>
                            <div>
                                <h1 className="desktop-header-title" style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>All Complaints Overview</h1>
                                <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '0.5rem 0 0 0' }}>Comprehensive view of all submitted complaints.</p>
                            </div>
                        </header>

                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <StatCard title="Total" count={totalComplaints} icon={BarChart3} color="#2563eb" bg="#dbeafe" />
                            <StatCard title="Pending" count={pendingComplaints.length} icon={Clock} color="#d97706" bg="#fef3c7" />
                            <StatCard title="Accepted" count={acceptedComplaints.length} icon={Check} color="#2563eb" bg="#dbeafe" />
                            <StatCard title="Rejected" count={rejectedComplaints.length} icon={XCircle} color="#dc2626" bg="#fee2e2" />
                        </div>

                        <div style={{ padding: '2rem', borderRadius: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Complaint History</h2>
                                <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600', padding: '0.4rem 1rem', background: '#f8fafc', borderRadius: '2rem', border: '1px solid #e2e8f0' }}>Total: {filteredHistoryComplaints.length} entries</span>
                            </div>

                            <div className="filters-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '0.5rem', padding: '0 0.75rem', transition: 'border-color 0.2s' }} onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'} onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}>
                                    <Search size={18} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="Search by title or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ border: 'none', outline: 'none', padding: '0.75rem', width: '100%', background: 'transparent', fontSize: '0.9rem', color: '#0f172a' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: '1 1 auto' }}>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        style={{ flex: '1 1 130px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', background: '#fff', color: '#0f172a', cursor: 'pointer' }}
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Unresolved">Unresolved</option>
                                    </select>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        style={{ flex: '1 1 130px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', background: '#fff', color: '#0f172a', cursor: 'pointer' }}
                                    >
                                        {uniqueCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        style={{ flex: '1 1 130px', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', background: '#fff', color: '#0f172a', cursor: 'pointer' }}
                                    >
                                        <option value="Newest">Newest First</option>
                                        <option value="Oldest">Oldest First</option>
                                    </select>
                                </div>
                            </div>

                            {filteredHistoryComplaints.length === 0 ? (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', minHeight: '300px' }}>
                                    <FileText size={72} style={{ opacity: 0.5, marginBottom: '1.5rem', color: '#cbd5e1' }} />
                                    <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>No complaints match your filters.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {filteredHistoryComplaints.map(complaint => {
                                        const colors = getStatusColor(complaint.status);
                                        return (
                                            <div key={complaint.id} className="list-item-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'all 0.2s ease', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.05)'; }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.4rem' }}>
                                                        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>{complaint.title}</h3>
                                                        <span style={{ fontSize: '0.75rem', color: '#64748b', padding: '0.2rem 0.6rem', background: '#f1f5f9', borderRadius: '1rem', fontWeight: '600' }}>ID: #{complaint.id}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Users size={16} /> {complaint.student}</span>
                                                        <span>•</span><span>{complaint.category || 'General'}</span><span>•</span><span>{formatDate(complaint.date)}</span>
                                                    </div>
                                                </div>
                                                <div className="list-item-mobile-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '2rem', background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                                        {getStatusIcon(complaint.status)} {complaint.status}
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
            </main>
        </div>
    );
};

export default AdminDashboard;
