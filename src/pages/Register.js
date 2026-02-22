import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Loader2, Lock, Mail, MessageCircle, ShieldCheck, User, Zap } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await register(formData.username, formData.email, formData.password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#09090b] font-sans selection:bg-purple-500/30">
            
            {/* LEFT PANEL: Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1964" 
                    alt="Modern Abstract" 
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/80 via-[#09090b]/40 to-transparent" />
                
                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    <div className="flex items-center gap-2 group/logo">
                        <div className="p-2 bg-purple-500 rounded-lg shadow-lg shadow-purple-500/40 group-hover/logo:rotate-12 transition-transform">
                            <MessageCircle className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">NexusChat</span>
                    </div>

                    <div className="max-w-md">
                        <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
                            Start your <span className="text-purple-400">journey</span> with us.
                        </h1>
                        <div className="grid grid-cols-1 gap-4 text-gray-300">
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <Zap size={20} className="text-purple-400" />
                                <div>
                                    <p className="text-sm font-bold text-white">Instant Setup</p>
                                    <p className="text-xs text-gray-400">Join thousands of users in seconds.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <ShieldCheck size={20} className="text-purple-400" />
                                <div>
                                    <p className="text-sm font-bold text-white">Privacy First</p>
                                    <p className="text-xs text-gray-400">Your data belongs to you, always.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-500 text-sm">
                        © 2024 Nexus Systems Inc.
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative">
                <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-purple-600/10 blur-[100px] rounded-full" />

                <div className="w-full max-w-sm relative z-10">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Create Account</h2>
                        <p className="text-gray-400">Enter your details to get started.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 text-red-400 rounded-2xl text-sm animate-in fade-in zoom-in duration-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter username"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#18181b] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none transition-all"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#18181b] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#18181b] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            {/* In production: <Link to="/login">...</Link> */}
                            <a href="/login" className="text-white font-bold hover:text-purple-400 transition-colors ml-1">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
