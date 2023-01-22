import { useEffect, useState } from 'react';

import axios from 'axios';

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:3000/api/chat');
    setChats(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chats.map((chat) => {
        return <div key={chat._id}> {chat.chatName}</div>;
      })}
    </div>
  );
};

export default Chatpage;
