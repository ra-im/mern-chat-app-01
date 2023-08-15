import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {

  const fetchChats = async () => {
      const {data} = await axios.get('/api/chat');

    console.log(data);
    setChats(data);
  }

  useEffect(() => {
      fetchChats();
  }, [])
  
  const [chats, setChats] = useState([]);
    

  return (
    <div>
      {chats.map((chat, index) => (
        // Render each chat item here, using the 'chat' object
        // and 'index' for unique keys if needed
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );

}

export default ChatPage