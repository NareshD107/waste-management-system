import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PenTool, BarChart3, LogOut, Recycle, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();

    return (
        <nav className="navbar glass-card">
            <div className="nav-brand">
                <Recycle className="nav-logo" size={32} />
                <span className="brand-text">EcoTrack</span>
            </div>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/log-waste" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <PenTool size={20} />
                    <span>Log Waste</span>
                </NavLink>

                <NavLink to="/schedule" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Calendar size={20} />
                    <span>Schedule</span>
                </NavLink>

                <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BarChart3 size={20} />
                    <span>Reports</span>
                </NavLink>

                <NavLink to="/feedback" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <MessageSquare size={20} />
                    <span>Feedback</span>
                </NavLink>
            </div>

            <div className="nav-footer">
                <button className="btn btn-outline logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
