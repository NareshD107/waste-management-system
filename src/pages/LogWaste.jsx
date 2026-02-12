import React, { useState } from 'react';
import { Leaf, Trash2, Weight, MapPin, Send, QrCode, Scan, X, Loader2 } from 'lucide-react';
import wasteService from '../services/wasteService';

const LogWaste = () => {
    const [formData, setFormData] = useState({
        weight: '',
        category: 'bio',
        location: '',
        method: 'compost'
    });

    const [showScanner, setShowScanner] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await wasteService.createLog({
                weight_kg: parseFloat(formData.weight),
                location_id: parseInt(formData.location),
                category_id: formData.category === 'bio' ? 1 : 2, // Map to backend IDs
                disposal_method: formData.method
            });
            alert('Waste logged successfully through API!');
            setFormData({ weight: '', category: 'bio', location: '', method: 'compost' });
        } catch (error) {
            console.error('Logging Error:', error);
            alert('Failed to log waste. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMockScan = () => {
        setFormData({
            ...formData,
            category: Math.random() > 0.5 ? 'bio' : 'non-bio',
            location: (Math.floor(Math.random() * 3) + 1).toString()
        });
        setShowScanner(false);
        alert('QR Code Scanned! Form auto-populated.');
    };

    return (
        <div className="page-container animate-fade-in">
            <header className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="heading">Log Waste Entry</h1>
                        <p className="text-secondary">Record new waste generation data for your organization.</p>
                    </div>
                    <button className="btn btn-outline" onClick={() => setShowScanner(true)}>
                        <QrCode size={20} />
                        <span>Scan Bin QR</span>
                    </button>
                </div>
            </header>

            <div className="glass-card form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label">Waste Category</label>
                        <div className="category-toggle">
                            <button
                                type="button"
                                className={`category-btn ${formData.category === 'bio' ? 'active bio' : ''}`}
                                onClick={() => setFormData({ ...formData, category: 'bio' })}
                            >
                                <Leaf size={20} />
                                <span>Bio-degradable</span>
                            </button>
                            <button
                                type="button"
                                className={`category-btn ${formData.category === 'non-bio' ? 'active non-bio' : ''}`}
                                onClick={() => setFormData({ ...formData, category: 'non-bio' })}
                            >
                                <Trash2 size={20} />
                                <span>Non-bio-degradable</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label className="label">Weight (kg)</label>
                            <div className="input-with-icon">
                                <Weight size={18} className="input-icon" />
                                <input
                                    type="number"
                                    step="0.1"
                                    className="input"
                                    placeholder="0.0"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Location / Site</label>
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
                    </div>

                    <div className="input-group">
                        <label className="label">Disposal Method</label>
                        <select
                            className="input"
                            value={formData.method}
                            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                        >
                            <option value="compost">Composting</option>
                            <option value="recycle">Recycling</option>
                            <option value="landfill">Landfill</option>
                            <option value="incineration">Incineration</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            <span>{isSubmitting ? 'Processing...' : 'Submit Log'}</span>
                        </button>
                    </div>
                </form>
            </div>

            {showScanner && (
                <div className="modal-overlay" onClick={() => setShowScanner(false)} style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)'
                }}>
                    <div className="glass-card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '450px', position: 'relative' }}>
                        <button
                            className="btn btn-outline"
                            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem', borderRadius: '50%' }}
                            onClick={() => setShowScanner(false)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="heading small" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Scan Bin QR/Barcode</h2>

                        <div style={{
                            aspectRatio: '1',
                            background: '#000',
                            borderRadius: '1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div className="scan-line" style={{
                                position: 'absolute',
                                width: '100%',
                                height: '2px',
                                background: 'var(--primary)',
                                boxShadow: '0 0 15px var(--primary)',
                                top: '50%',
                                animation: 'scanMove 2s infinite ease-in-out'
                            }}></div>
                            <Scan size={64} className="text-secondary" style={{ opacity: 0.3 }} />
                        </div>

                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Position the QR code within the frame to automatically identify the bin.
                        </p>

                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleMockScan}>
                            Simulate Scan
                        </button>
                    </div>
                    <style>{`
                        @keyframes scanMove {
                            0% { top: 10%; }
                            50% { top: 90%; }
                            100% { top: 10%; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default LogWaste;
