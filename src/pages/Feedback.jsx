import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, Clock, CheckCircle2, Send, Paperclip, Loader2 } from 'lucide-react';
import feedbackService from '../services/feedbackService';

const Feedback = () => {
    const [formData, setFormData] = useState({
        type: 'complaint',
        priority: 'medium',
        subject: '',
        description: ''
    });

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const data = await feedbackService.getFeedbacks();
            setTickets(data);
        } catch (error) {
            console.error('Fetch Tickets Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await feedbackService.submitFeedback({
                type: formData.type,
                priority: formData.priority,
                subject: formData.subject,
                description: formData.description
            });
            alert('Feedback submitted successfully!');
            fetchTickets();
        } catch (error) {
            console.error('Feedback Error:', error);
            alert('Failed to submit feedback.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container animate-fade-in">
            <header className="page-header">
                <h1 className="heading">Feedback & Redressal</h1>
                <p className="text-secondary">Report issues or suggest improvements to our waste management services.</p>
            </header>

            <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <div className="glass-card">
                    <h2 className="heading small">Submit Feedback / Complaint</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid-2">
                            <div className="input-group">
                                <label className="label">Issue Type</label>
                                <select
                                    className="input"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="complaint">Complaint</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="report">Operational Report</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="label">Priority</label>
                                <select
                                    className="input"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Subject</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Brief summary of the issue"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="label">Description</label>
                            <textarea
                                className="input"
                                style={{ minHeight: '120px', resize: 'vertical' }}
                                placeholder="Provide detailed information..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <div className="form-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <button type="button" className="btn btn-outline">
                                <Paperclip size={18} />
                                <span>Attach File</span>
                            </button>
                            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="glass-card">
                    <h2 className="heading small">My Recent Tickets</h2>
                    <div className="ticket-list">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto', opacity: 0.5 }} />
                            </div>
                        ) : tickets.length === 0 ? (
                            <p className="text-secondary" style={{ textAlign: 'center', padding: '2rem' }}>No recent tickets.</p>
                        ) : (
                            tickets.map(ticket => (
                                <div key={ticket.id} className="ticket-item" style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>T-{ticket.id}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(ticket.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ fontWeight: '500' }}>{ticket.subject}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                                            {ticket.status === 'Pending' ? <Clock size={14} color="#f59e0b" /> : <CheckCircle2 size={14} color="#10b981" />}
                                            <span style={{ color: ticket.status === 'Pending' ? '#f59e0b' : '#10b981' }}>{ticket.status}</span>
                                        </div>
                                        <div className="badge" style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)' }}>
                                            {ticket.priority.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
