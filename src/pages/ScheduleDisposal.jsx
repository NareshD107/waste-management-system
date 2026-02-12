import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, QrCode, Send, CheckCircle2, Loader2 } from 'lucide-react';
import wasteService from '../services/wasteService';

const ScheduleDisposal = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: 'morning',
        category: 'bio',
        location: ''
    });

    const [scheduledItems, setScheduledItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const data = await wasteService.getSchedules();
            setScheduledItems(data);
        } catch (error) {
            console.error('Fetch Schedules Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const [showQR, setShowQR] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await wasteService.createSchedule({
                date: formData.date,
                time_slot: formData.time === 'morning' ? 'Morning' : 'Afternoon',
                category: formData.category === 'bio' ? 'Bio-degradable' : 'Non-bio-degradable',
                location_id: parseInt(formData.location)
            });
            alert('Pickup scheduled successfully via API!');
            fetchSchedules();
        } catch (error) {
            console.error('Schedule Error:', error);
            alert('Failed to schedule pickup.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container animate-fade-in">
            <header className="page-header">
                <h1 className="heading">Schedule Waste Disposal</h1>
                <p className="text-secondary">Request a professional waste collection for your location.</p>
            </header>

            <div className="charts-grid">
                <div className="glass-card form-container">
                    <h2 className="heading small">New Pickup Request</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid-2">
                            <div className="input-group">
                                <label className="label">Pickup Date</label>
                                <div className="input-with-icon">
                                    <Calendar size={18} className="input-icon" />
                                    <input
                                        type="date"
                                        className="input"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="label">Time Slot</label>
                                <div className="input-with-icon">
                                    <Clock size={18} className="input-icon" />
                                    <select
                                        className="input"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    >
                                        <option value="morning">Morning (08:00 - 12:00)</option>
                                        <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Location</label>
                            <div className="input-with-icon">
                                <MapPin size={18} className="input-icon" />
                                <select
                                    className="input"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                >
                                    <option value="">Select Location</option>
                                    <option value="1">Main Cafeteria</option>
                                    <option value="2">Science Lab A</option>
                                    <option value="3">Office Block North</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                <span>{isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="glass-card">
                    <h2 className="heading small">Upcoming Pickups</h2>
                    <div className="scheduled-list">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto', opacity: 0.5 }} />
                            </div>
                        ) : scheduledItems.length === 0 ? (
                            <p className="text-secondary" style={{ textAlign: 'center', padding: '2rem' }}>No upcoming pickups found.</p>
                        ) : (
                            scheduledItems.map(item => (
                                <div key={item.id} className="scheduled-item glass-card" style={{ padding: '1rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Location Area {item.location_id}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                {item.date} • {item.time_slot}
                                            </div>
                                            <div className={`badge ${item.category.includes('Bio') ? 'badge-bio' : 'badge-non-bio'}`} style={{ marginTop: '0.5rem' }}>
                                                {item.category}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: '0.5rem' }}
                                            onClick={() => setShowQR(item.id)}
                                        >
                                            <QrCode size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {showQR && (
                <div className="modal-overlay" onClick={() => setShowQR(null)} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
                }}>
                    <div className="glass-card" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: '300px' }}>
                        <h3 className="heading small">Disposal QR Code</h3>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DISPOSAL-${showQR}`}
                                alt="QR Code"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Present this to the collector for verification.
                        </p>
                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowQR(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleDisposal;
