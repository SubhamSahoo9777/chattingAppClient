// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import ChatWindow from '../components/ChatWindow';

// const Home = () => {
//     return (
//         <div className="h-screen flex bg-gray-100 overflow-hidden">
//             <Sidebar />
//             <ChatWindow />
//         </div>
//     );
// };

// export default Home;
import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const Home = () => {
    return (
        <div className="h-screen w-full bg-[#0f172a] flex overflow-hidden font-sans text-slate-200">
            <Sidebar />
            <ChatWindow />
        </div>
    );
};

export default Home;