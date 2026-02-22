
import React, { useState } from 'react';
import { MessageCircle, Mail, Lock, ArrowRight, Loader2, ShieldCheck, Zap, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };
    return (
        // <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans">
        //     {/* Background Decorative Elements */}
        //     <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        //     <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

        //     <div className="max-w-md w-full mx-4 relative z-10">
        //         {/* Main Card */}
        //         <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    
        //             {/* Header Section */}
        //             <div className="flex flex-col items-center mb-10">
        //                 <div className="relative group">
        //                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        //                     <div className="relative p-4 bg-gray-900 rounded-2xl border border-white/10 shadow-inner">
        //                         <MessageCircle className="text-indigo-400" size={36} strokeWidth={1.5} />
        //                     </div>
        //                 </div>
        //                 <h2 className="text-3xl font-extrabold text-white mt-6 tracking-tight">Welcome Back</h2>
        //                 <p className="text-gray-400 mt-2 text-sm font-medium">Continue your conversations seamlessly</p>
        //             </div>

        //             {/* Error Display */}
        //             {error && (
        //                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
        //                     <span className="mr-2">⚠️</span>
        //                     {error}
        //                 </div>
        //             )}

        //             <form onSubmit={handleSubmit} className="space-y-5">
        //                 {/* Email Field */}
        //                 <div className="space-y-1.5">
        //                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
        //                         Email Address
        //                     </label>
        //                     <div className="relative group">
        //                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        //                             <Mail size={18} className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        //                         </div>
        //                         <input
        //                             type="email"
        //                             required
        //                             placeholder="name@company.com"
        //                             className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-200"
        //                             value={email}
        //                             onChange={(e) => setEmail(e.target.value)}
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Password Field */}
        //                 <div className="space-y-1.5">
        //                     <div className="flex justify-between items-end ml-1">
        //                         <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        //                             Password
        //                         </label>
        //                         <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
        //                             Forgot?
        //                         </button>
        //                     </div>
        //                     <div className="relative group">
        //                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        //                             <Lock size={18} className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        //                         </div>
        //                         <input
        //                             type="password"
        //                             required
        //                             placeholder="••••••••"
        //                             className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-200"
        //                             value={password}
        //                             onChange={(e) => setPassword(e.target.value)}
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Submit Button */}
        //                 <button
        //                     type="submit"
        //                     disabled={loading}
        //                     className="w-full group relative flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        //                 >
        //                     <span className="relative z-10 flex items-center">
        //                         {loading ? (
        //                             <>
        //                                 <Loader2 className="animate-spin mr-2" size={20} />
        //                                 Authenticating...
        //                             </>
        //                         ) : (
        //                             <>
        //                                 Sign In
        //                                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        //                             </>
        //                         )}
        //                     </span>
        //                 </button>
        //             </form>

        //             {/* Footer Links */}
        //             <div className="mt-10 pt-6 border-t border-white/5">
        //                 <p className="text-center text-gray-500 text-sm">
        //                     New to the platform?{' '}
        //                     {/* Assuming Link is imported from react-router-dom */}
        //                     <a href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors ml-1">
        //                         Create Account
        //                     </a>
        //                 </p>
        //             </div>
        //         </div>

        //         {/* Subtle Social Proof or Footer */}
        //         <div className="mt-8 text-center">
        //             <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
        //                 Secure Encryption • Real-time Sync • Zero Logs
        //             </p>
        //         </div>
        //     </div>
        // </div>
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
                            <label className="text-sm font-semibold text-gray-300 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#18181b] border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                     value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

export default Login;