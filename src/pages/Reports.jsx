import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Leaf, DollarSign, Zap } from 'lucide-react';

const Reports = () => {
    const [liveData, setLiveData] = useState([
        { time: '10:00', weight: 45 },
        { time: '11:00', weight: 32 },
        { time: '12:00', weight: 58 },
        { time: '13:00', weight: 24 },
        { time: '14:00', weight: 41 },
        { time: '15:00', weight: 37 },
    ]);

    // Forecasting data (Real + Predicted)
    const forecastData = [
        { month: 'Jan', actual: 400, forecast: null },
        { month: 'Feb', actual: 300, forecast: null },
        { month: 'Mar', actual: 600, forecast: 600 },
        { month: 'Apr', actual: null, forecast: 750 },
        { month: 'May', actual: null, forecast: 820 },
        { month: 'Jun', actual: null, forecast: 900 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(prev => {
                const newData = [...prev.slice(1)];
                const lastTime = prev[prev.length - 1].time;
                const [h, m] = lastTime.split(':').map(Number);
                const nextTime = `${h + 1}:00`;
                newData.push({ time: nextTime, weight: Math.floor(Math.random() * 50) + 20 });
                return newData;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-container animate-fade-in">
            <header className="page-header">
                <h1 className="heading">Real-time Analytics & Forecasting</h1>
                <p className="text-secondary">AI-driven insights and live waste generation monitoring.</p>
            </header>

            <div className="stats-grid">
                <div className="glass-card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <Zap color="var(--primary)" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-title">Real-time Inflow</p>
                        <h3 className="stat-value">{liveData[liveData.length - 1].weight} kg/hr</h3>
                        <p className="stat-delta up">Live Updating</p>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                        <TrendingUp color="var(--secondary)" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-title">Forecasted Growth</p>
                        <h3 className="stat-value">+12.5%</h3>
                        <p className="stat-secondary">Next 30 Days</p>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                        <Leaf color="var(--accent)" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-title">Carbon Saved</p>
                        <h3 className="stat-value">2.4 Tons</h3>
                        <p className="stat-delta up">↑ 8% vs last month</p>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <DollarSign color="var(--error)" />
                    </div>
                    <div className="stat-content">
                        <p className="stat-title">Estimated Savings</p>
                        <h3 className="stat-value">$1,240</h3>
                        <p className="stat-secondary">Annualized</p>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="glass-card chart-container">
                    <h2 className="heading small">Waste Generation Forecast</h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                                />
                                <Line type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)' }} />
                                <Line type="monotone" dataKey="forecast" stroke="var(--secondary)" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: 'var(--secondary)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '700' }}>—</span> Actual Generation
                        <span style={{ marginLeft: '1rem', color: 'var(--secondary)', fontWeight: '700' }}>---</span> AI Predicted Trend
                    </p>
                </div>

                <div className="glass-card chart-container">
                    <h2 className="heading small">Real-time Inflow (kg)</h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={liveData}>
                                <defs>
                                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="var(--text-secondary)" />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="weight" stroke="var(--primary)" fillOpacity={1} fill="url(#colorWeight)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
