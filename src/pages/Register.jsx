import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Mail, Lock, Building, Recycle, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        organization_id: 1 // Default for now
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Mock registration success
        setTimeout(() => {
            alert('Registration successful! (Mock Mode) Please sign in.');
            navigate('/login');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="login-page">
            <div className="login-card-wrapper animate-fade-in">
                <div className="login-header">
                    <div className="login-logo">
                        <Recycle size={48} className="nav-logo" />
                    </div>
                    <h1 className="heading">EcoTrack</h1>
                    <p className="text-secondary">Join our sustainability network</p>
                </div>

                <div className="glass-card login-card">
                    <h2 className="heading" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create Account</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="label">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="user@organization.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="label">Organization ID (Optional)</label>
                            <div className="input-with-icon">
                                <Building size={18} className="input-icon" />
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.organization_id}
                                    onChange={(e) => setFormData({ ...formData, organization_id: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary login-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
                            <span>{isSubmitting ? 'Creating account...' : 'Sign Up'}</span>
                        </button>
                    </form>

                    <div className="login-footer">
                        <p className="text-secondary">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
