import React, { createContext, useContext, useState, useEffect } from 'react';
import { chatAPI } from '../api';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const { socket } = useSocket();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingUsers, setTypingUsers] = useState({}); // conversationId: boolean

    const fetchConversations = async () => {
        if (!user) return;
        try {
            const { data } = await chatAPI.getConversations();
            setConversations(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const fetchMessages = async (convId) => {
        if (!convId) return;
        setLoading(true);
        try {
            const { data } = await chatAPI.getMessages(convId);
            setMessages(data);
        } catch (error) {
            console.error('Fetch message error:', error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (text, recipientId) => {
        try {
            const { data } = await chatAPI.sendMessage({
                conversationId: selectedConversation?._id,
                text,
                recipientId
            });
            
            setMessages(prev => [...prev, data]);
            
            // Emit to socket
            if (socket) {
                const recipient = selectedConversation?.participants.find(p => p._id !== user._id) || { _id: recipientId };
                socket.emit('sendMessage', {
                    ...data,
                    participants: [user._id, recipient._id]
                });
            }
            
            fetchConversations(); // Refresh last message in list
        } catch (error) {
            console.error('Send message error:', error);
        }
    };

    useEffect(() => {
        if (user) fetchConversations();
    }, [user]);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation._id);
        } else {
            setMessages([]);
        }
    }, [selectedConversation]);

    useEffect(() => {
        if (!socket) return;

        socket.on('newMessage', (message) => {
            if (selectedConversation?._id === message.conversationId) {
                setMessages(prev => [...prev, message]);
            }
            fetchConversations();
        });

        socket.on('typing_start', ({ conversationId }) => {
            setTypingUsers(prev => ({ ...prev, [conversationId]: true }));
        });

        socket.on('typing_stop', ({ conversationId }) => {
            setTypingUsers(prev => ({ ...prev, [conversationId]: false }));
        });

        return () => {
            socket.off('newMessage');
            socket.off('typing_start');
            socket.off('typing_stop');
        };
    }, [socket, selectedConversation]);

    return (
        <ChatContext.Provider value={{
            conversations,
            selectedConversation,
            setSelectedConversation,
            messages,
            sendMessage,
            loading,
            typingUsers,
            fetchConversations
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
