// import React, { useState } from 'react';
// import { useChat } from '../context/ChatContext';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { Search, LogOut, User as UserIcon } from 'lucide-react';
// import axios from 'axios';

// const Sidebar = () => {
//     const { conversations, setSelectedConversation, selectedConversation } = useChat();
//     const { user, logout } = useAuth();
//     const { onlineUsers } = useSocket();
//     const [search, setSearch] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);

//     const handleSearch = async (e) => {
//         const query = e.target.value;
//         setSearch(query);
//         if (query.length > 2) {
//             setIsSearching(true);
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/api/chat/users?search=${query}`, {
//                     headers: { Authorization: `Bearer ${user.token}` }
//                 });
//                 setSearchResults(data);
//             } catch (err) {
//                 console.error(err);
//             }
//         } else {
//             setIsSearching(false);
//             setSearchResults([]);
//         }
//     };

//     const startChat = (newUser) => {
//         const existing = conversations.find(c => 
//             c.participants.some(p => p._id === newUser._id)
//         );
        
//         if (existing) {
//             setSelectedConversation(existing);
//         } else {
//             // Fake conversation object for UI before first message
//             setSelectedConversation({
//                 _id: null,
//                 participants: [user, newUser]
//             });
//         }
//         setSearch('');
//         setIsSearching(false);
//     };

//     return (
//         <div className="w-1/4 bg-white border-r flex flex-col h-full">
//             <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
//                 <div className="flex items-center gap-2">
//                     <img src={user.profilePic} alt="me" className="w-10 h-10 rounded-full border-2 border-white" />
//                     <span className="font-semibold">{user.username}</span>
//                 </div>
//                 <button onClick={logout} className="p-2 hover:bg-indigo-700 rounded-full">
//                     <LogOut size={20} />
//                 </button>
//             </div>

//             <div className="p-4">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search users..."
//                         className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         value={search}
//                         onChange={handleSearch}
//                     />
//                 </div>
//             </div>

//             <div className="flex-1 overflow-y-auto">
//                 {isSearching ? (
//                     <div className="px-2">
//                         <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Search Results</p>
//                         {searchResults.map(u => (
//                             <div
//                                 key={u._id}
//                                 onClick={() => startChat(u)}
//                                 className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
//                             >
//                                 <img src={u.profilePic} className="w-12 h-12 rounded-full" alt="" />
//                                 <div>
//                                     <p className="font-medium">{u.username}</p>
//                                     <p className="text-sm text-gray-500">{u.email}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="px-2">
//                         <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Conversations</p>
//                         {conversations.map(conv => {
//                             const otherUser = conv.participants.find(p => p._id !== user._id);
//                             const isSelected = selectedConversation?._id === conv._id;
//                             const isOnline = onlineUsers.includes(otherUser?._id);

//                             return (
//                                 <div
//                                     key={conv._id}
//                                     onClick={() => setSelectedConversation(conv)}
//                                     className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-colors ${
//                                         isSelected ? 'bg-indigo-50 border-r-4 border-indigo-500' : 'hover:bg-gray-50'
//                                     }`}
//                                 >
//                                     <div className="relative">
//                                         <img src={otherUser?.profilePic} className="w-12 h-12 rounded-full" alt="" />
//                                         {isOnline && (
//                                             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                                         )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <div className="flex justify-between">
//                                             <p className="font-semibold text-gray-900 truncate">{otherUser?.username}</p>
//                                         </div>
//                                         <p className="text-sm text-gray-500 truncate">
//                                             {conv.lastMessage?.text || 'Start a conversation'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Search, LogOut, Plus } from 'lucide-react';
import axios from 'axios';
import {BASE_URL} from '../api';

const Sidebar = () => {
    const { conversations, setSelectedConversation, selectedConversation } = useChat();
    const { user, logout } = useAuth();
    const { onlineUsers } = useSocket();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length > 2) {
            setIsSearching(true);
            try {
                const { data } = await axios.get(
                    `${BASE_URL}/api/chat/users?search=${query}`,
                    {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }
                );
                setSearchResults(data);
            } catch (err) {
                console.error(err);
            }
        } else {
            setIsSearching(false);
            setSearchResults([]);
        }
    };

    const startChat = (newUser) => {
        const existing = conversations.find(c =>
            c.participants.some(p => p._id === newUser._id)
        );

        if (existing) {
            setSelectedConversation(existing);
        } else {
            setSelectedConversation({
                _id: null,
                participants: [user, newUser]
            });
        }

        setSearch('');
        setIsSearching(false);
    };

    return (
        <div className="w-[360px] bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col h-full">
            
            {/* Header */}
            <div className="px-6 py-6 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <img
                        src={user.profilePic}
                        alt="me"
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-800"
                    />
                    <div>
                        <h1 className="text-sm font-bold text-slate-100">{user.username}</h1>
                        <p className="text-[10px] text-slate-400 uppercase">Account</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Title + Search */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Messages
                    </h2>
                    <button className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-full">
                        <Plus size={18} />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl outline-none text-sm text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 space-y-2">
                {isSearching ? (
                    searchResults.map(u => (
                        <button
                            key={u._id}
                            onClick={() => startChat(u)}
                            className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-800/40 transition-all text-left"
                        >
                            <img src={u.profilePic} className="w-12 h-12 rounded-2xl" alt="" />
                            <div>
                                <p className="font-semibold text-slate-200">{u.username}</p>
                                <p className="text-xs text-slate-400">{u.email}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    conversations.map(conv => {
                        const otherUser = conv.participants.find(p => p._id !== user._id);
                        const isSelected = selectedConversation?._id === conv._id;
                        const isOnline = onlineUsers.includes(otherUser?._id);

                        return (
                            <button
                                key={conv._id}
                                onClick={() => setSelectedConversation(conv)}
                                className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all ${
                                    isSelected
                                        ? 'bg-gradient-to-r from-indigo-600/90 to-violet-600/90'
                                        : 'hover:bg-slate-800/40'
                                }`}
                            >
                                <div className="relative">
                                    <img
                                        src={otherUser?.profilePic}
                                        className="w-14 h-14 rounded-[20px] object-cover"
                                        alt=""
                                    />
                                    {isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-4 border-slate-900 rounded-full bg-green-500"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <p className="font-bold truncate text-slate-200">
                                        {otherUser?.username}
                                    </p>
                                    <p className="text-sm text-slate-400 truncate">
                                        {conv.lastMessage?.text || 'Start a conversation'}
                                    </p>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Sidebar;