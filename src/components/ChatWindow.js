// import React, { useState, useEffect, useRef } from 'react';
// import { useChat } from '../context/ChatContext';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { Send, Phone, Video, Info } from 'lucide-react';

// const ChatWindow = () => {
//     const { selectedConversation, messages, sendMessage, typingUsers } = useChat();
//     const { user } = useAuth();
//     const { socket, onlineUsers } = useSocket();
//     const [input, setInput] = useState('');
//     const scrollRef = useRef();

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const otherUser = selectedConversation?.participants.find(p => p._id !== user._id);
//     const isOnline = onlineUsers.includes(otherUser?._id);
//     const isTyping = typingUsers[selectedConversation?._id];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!input.trim()) return;
//         sendMessage(input, otherUser._id);
//         setInput('');
        
//         if (socket && selectedConversation?._id) {
//             socket.emit('typing_stop', {
//                 conversationId: selectedConversation._id,
//                 senderId: user._id,
//                 recipientId: otherUser._id
//             });
//         }
//     };

//     const handleKeyDown = () => {
//         if (!socket || !selectedConversation?._id) return;
        
//         socket.emit('typing_start', {
//             conversationId: selectedConversation._id,
//             senderId: user._id,
//             recipientId: otherUser._id
//         });

//         const timeout = setTimeout(() => {
//             socket.emit('typing_stop', {
//                 conversationId: selectedConversation._id,
//                 senderId: user._id,
//                 recipientId: otherUser._id
//             });
//         }, 2000);

//         return () => clearTimeout(timeout);
//     };

//     if (!selectedConversation) {
//         return (
//             <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
//                 <div className="bg-white p-8 rounded-full shadow-sm mb-4">
//                     <Send size={48} className="text-indigo-500" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Your Messages</h2>
//                 <p>Select a user from the sidebar to start chatting</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex-1 flex flex-col bg-white">
//             {/* Header */}
//             <div className="px-6 py-4 border-b flex items-center justify-between shadow-sm">
//                 <div className="flex items-center gap-3">
//                     <div className="relative">
//                         <img src={otherUser?.profilePic} className="w-10 h-10 rounded-full" alt="" />
//                         {isOnline && (
//                             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
//                         )}
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-gray-900">{otherUser?.username}</h3>
//                         <p className="text-xs text-gray-500">
//                             {isOnline ? 'Online' : 'Offline'}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex gap-4 text-gray-400">
//                     <Phone className="cursor-pointer hover:text-indigo-600" size={20} />
//                     <Video className="cursor-pointer hover:text-indigo-600" size={20} />
//                     <Info className="cursor-pointer hover:text-indigo-600" size={20} />
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 messages-container">
//                 {messages.map((msg, idx) => {
//                     const isMe = msg.sender._id === user._id || msg.sender === user._id;
//                     return (
//                         <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
//                                 isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
//                             }`}>
//                                 <p>{msg.text}</p>
//                                 <p className={`text-[10px] mt-1 ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
//                                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//                 {isTyping && (
//                     <div className="flex justify-start">
//                         <div className="bg-gray-200 px-4 py-2 rounded-full text-xs text-gray-500 animate-pulse">
//                             {otherUser.username} is typing...
//                         </div>
//                     </div>
//                 )}
//                 <div ref={scrollRef} />
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t">
//                 <form onSubmit={handleSubmit} className="flex gap-2">
//                     <input
//                         type="text"
//                         placeholder="Type a message..."
//                         className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                     />
//                     <button
//                         type="submit"
//                         disabled={!input.trim()}
//                         className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
//                     >
//                         <Send size={20} />
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Send, Phone, Video, Info, CheckCheck } from 'lucide-react';

const ChatWindow = () => {
    const { selectedConversation, messages, sendMessage, typingUsers } = useChat();
    const { user } = useAuth();
    const { socket, onlineUsers } = useSocket();
    const [input, setInput] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const otherUser = selectedConversation?.participants.find(p => p._id !== user._id);
    const isOnline = onlineUsers.includes(otherUser?._id);
    const isTyping = typingUsers[selectedConversation?._id];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input, otherUser._id);
        setInput('');

        if (socket && selectedConversation?._id) {
            socket.emit('typing_stop', {
                conversationId: selectedConversation._id,
                senderId: user._id,
                recipientId: otherUser._id
            });
        }
    };

    const handleKeyDown = () => {
        if (!socket || !selectedConversation?._id) return;

        socket.emit('typing_start', {
            conversationId: selectedConversation._id,
            senderId: user._id,
            recipientId: otherUser._id
        });
    };

    if (!selectedConversation) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0f172a] text-slate-400">
                <h2 className="text-3xl font-bold text-slate-100 mb-2">Hyper Chat</h2>
                <p>Select a conversation to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#0f172a]">
            
            {/* Header */}
            <div className="h-[80px] px-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={otherUser?.profilePic}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                            alt=""
                        />
                        {isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100">{otherUser?.username}</h3>
                        <p className="text-xs text-slate-500">
                            {isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                    <Phone className="cursor-pointer hover:text-indigo-400" />
                    <Video className="cursor-pointer hover:text-indigo-400" />
                    <Info className="cursor-pointer hover:text-indigo-400" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => {
                    const isMe = msg.sender._id === user._id || msg.sender === user._id;
                    return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm shadow-lg ${
                                    isMe
                                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none'
                                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                                }`}
                            >
                                <p>{msg.text}</p>
                                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70">
                                    <span>
                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    {isMe && <CheckCheck size={12} />}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="text-xs text-slate-400 animate-pulse">
                        {otherUser?.username} is typing...
                    </div>
                )}

                <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/40 backdrop-blur">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Start typing..."
                        className="flex-1 px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl outline-none text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/30"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="px-6 py-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl hover:from-indigo-400 hover:to-indigo-500 disabled:opacity-30 transition-all shadow-xl"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;