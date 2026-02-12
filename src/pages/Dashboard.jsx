import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingDown, TrendingUp, Scale, Recycle, AlertTriangle, Users, Loader2 } from 'lucide-react';
import wasteService from '../services/wasteService';

const Dashboard = () => {
    const stats = [
        { title: 'Total Waste', value: '1,284 kg', delta: '-12%', trend: 'down', icon: Scale, color: '#3b82f6' },
        { title: 'Recycling Rate', value: '64%', delta: '+5%', trend: 'up', icon: Recycle, color: '#10b981' },
        { title: 'Hazardous Waste', value: '42 kg', delta: '-8%', trend: 'down', icon: AlertTriangle, color: '#ef4444' },
        { title: 'Active Sites', value: '12', delta: '0', trend: 'neutral', icon: Users, color: '#f59e0b' },
    ];

    const wasteData = [
        { name: 'Mon', bio: 45, nonBio: 30 },
        { name: 'Tue', bio: 52, nonBio: 35 },
        { name: 'Wed', bio: 48, nonBio: 28 },
        { name: 'Thu', bio: 61, nonBio: 42 },
        { name: 'Fri', bio: 55, nonBio: 38 },
        { name: 'Sat', bio: 32, nonBio: 20 },
        { name: 'Sun', bio: 28, nonBio: 15 },
    ];

    const pieData = [
        { name: 'Bio-degradable', value: 65, color: '#10b981' },
        { name: 'Non-bio-degradable', value: 35, color: '#f59e0b' },
    ];

    return (
        <div className="page-container animate-fade-in">
            <header className="page-header">
                <h1 className="heading">Dashboard Overview</h1>
                <p className="text-secondary">Track your organization's sustainability metrics in real-time.</p>
            </header>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass-card stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-title">{stat.title}</span>
                            <h3 className="stat-value">{stat.value}</h3>
                            <div className={`stat-delta ${stat.trend}`}>
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : stat.trend === 'down' ? <TrendingDown size={14} /> : null}
                                <span>{stat.delta} vs last week</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-grid">
                <div className="glass-card chart-container large">
                    <h3 className="heading small">Waste Generation Trends</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={wasteData}>
                                <defs>
                                    <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="bio" stroke="#10b981" fillOpacity={1} fill="url(#colorBio)" name="Bio-degradable" />
                                <Area type="monotone" dataKey="nonBio" stroke="#f59e0b" fill="transparent" name="Non-bio-degradable" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card chart-container small">
                    <h3 className="heading small">Waste Composition</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legend">
                            {pieData.map((item, idx) => (
                                <div key={idx} className="legend-item">
                                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                                    <span className="legend-text">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
