import React from 'react';
import { useChatState } from '../Context/ChatProvider';

import Sidebar from '../components/miscellaneous/Sidebar';
import RecentChats from '../components/ChatComponents/RecentChats';
import Chatbox from '../components/ChatComponents/Chatbox';

import { Box } from '@chakra-ui/react';

const ChatPage = () => {
  //const [chats, setChats] = useState([]);
  
  //const fetchChats = async () => {
  //  const { data } = await axios.get('/api/chat');

  //  console.log(data);
  //  setChats(data);
  //};

  //useEffect(() => {
  //  fetchChats();
  //}, []);
  
  const { user } = useChatState();

  return (
    <div style={{width: '100%'}}>
      {/*TEST*/}
      {/*{chats.map((chat, index) => (
        // Render each chat item here, using the 'chat' object
        // and 'index' for unique keys if needed
        <div key={chat._id}>{chat.chatName}</div>
      ))}*/}

      {user && <Sidebar />}
      <Box
        bg={'white'}
        display={'flex'}
        width={'100%'}
        justifyContent={'space-between'}
        h={'90vh'}
        p={'10px'}
      >
        {user && <RecentChats />}
        {user && <Chatbox />}
      </Box>

    </div>
  );

}

export default ChatPage;
