import * as React from 'react';
import { Box } from '@mui/material';
import Conversations from '../../components/Conversations';
import History from '../../components/History/History';
import { GetChats, GetHistoric } from '../../services/get';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';
import { MessageSocket } from '../../types/Chat';

const Chats = () => {
  const { chats, handleGetChats } = GetChats();
  const [selectUser, setSelectUser] = React.useState<string>('');

  const selectChat = React.useMemo(() => {
    const selected = chats.find((e) => e.participants?.[1] === selectUser);
    return selected;
  }, [chats, selectUser]);
  const { historic } = GetHistoric(selectChat?.chat_id as string);

  const { lastMessage } = useWebSocket(
    `ws://${import.meta.env.VITE_PUBLIC_API}/ws/${selectChat?.chat_id}`,
    {
      onOpen: () => console.log('Chat connected'),
      onClose: () => console.log('Chat disconnected'),
      shouldReconnect: () => true,
    }
  );

  const handleCreateChat = async () => {
    try {
      await axios.post(`http://${import.meta.env.VITE_PUBLIC_API}/chats`, {
        participants: ['user0', selectUser],
      });
      handleGetChats();
    } catch (error) {
      console.log(error);
    }
  };

  const event = React.useMemo(() => {
    if (lastMessage) {
      const socket: MessageSocket = JSON.parse(lastMessage?.data);
      return socket;
    }
  }, [lastMessage]);

  return (
    <Box width="100%" display="flex">
      <Conversations
        chats={chats}
        onCreate={handleCreateChat}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
        event={event}
      />
      <History
        event={event}
        chat={selectChat}
        user={selectUser}
        historic={historic}
        lastMessage={lastMessage}
      />
    </Box>
  );
};

export default Chats;
