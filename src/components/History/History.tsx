import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDrawer } from '../../contexts/DrawerContext/DrawerContext';
import Footer from './Footer';
import {
  Chats,
  EUser,
  Message,
  MessageSocket,
  onSendProps,
} from '../../types/Chat';
import NoHistory from './NoHistory';
import axios from 'axios';
import MessageBox from './MessageBox';

interface HistoryProps {
  chat?: Chats;
  user: string;
  historic: Message[];
  lastMessage: MessageEvent<MessageSocket> | null;
  event?: MessageSocket;
}

const History = ({
  chat,
  user,
  historic,
  lastMessage,
  event,
}: HistoryProps) => {
  const [messages, setMessages] = React.useState<Message[]>(historic);
  const { open } = useDrawer();
  const drawerWidth = open ? 240 : 65;
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const messageSocket = (messageSocket: MessageSocket): Message => {
    return {
      event: messageSocket.event,
      content: messageSocket.data.content,
      user_id: messageSocket.data.user_id,
      timestamp: messageSocket.data.timestamp,
      id: messageSocket.data.id,
      type: messageSocket.data.type,
      status: messageSocket.data?.status,
      last_seen: messageSocket.data?.last_seen,
      last_read_message_id: messageSocket.data?.last_read_message_id,
    };
  };

  const chatRead = React.useMemo(() => {
    if (event?.event === 'chat_read') {
      return event.data;
    }
    return null;
  }, [event]);

  React.useEffect(() => {
    if (historic && historic.length > 0) {
      setMessages(historic);
    } else {
      setMessages([]);
    }
  }, [historic]);

  React.useEffect(() => {
    if (lastMessage) {
      const socket: MessageSocket = JSON.parse(
        lastMessage?.data as unknown as string
      );
      const message = messageSocket(socket);
      setMessages((prev) => [...prev, message]);
    }
  }, [lastMessage]);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSend = async ({ type, content }: onSendProps) => {
    try {
      await axios.post(
        `http://${import.meta.env.VITE_PUBLIC_API}/chats/${chat?.chat_id}/messages`,
        {
          user_id: 'user0',
          type: type,
          content: content,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!chat || messages?.length === 0) {
    return <NoHistory onSend={onSend} />;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        width: `calc(100vw - ${drawerWidth + 300}px)`,
        bgcolor: '#f2f2f2',
        p: 2,
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Typography mb={2}>{EUser[user as keyof typeof EUser]}</Typography>
      <Box sx={{ height: '70vh', overflowY: 'auto', pr: 1 }}>
        {messages
          .filter(
            (message) => message.event === 'message_received' || !message.event
          )
          .map((message) => (
            <MessageBox
              read={chatRead}
              key={message.id}
              message={message}
              isUser={message.user_id === 'user0'}
            />
          ))}
        <Box ref={messagesEndRef} />
      </Box>
      <Footer onSend={onSend} />
    </Paper>
  );
};

export default History;
