import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { EUser, Message } from '../../../types/Chat';
import { format } from 'date-fns';
import { MessageBoxStyled } from './MessageBox.styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface MessageBoxProps {
  message: Message;
  isUser: boolean;
  read: Message | null;
}

const MessageBox = ({ message, isUser, read }: MessageBoxProps) => {
  const [visualizedMessages, setVisualizedMessages] = React.useState<
    Set<string>
  >(new Set());

  const adjustTimezone = (timestamp: string) => {
    const date = new Date(timestamp);
    const localOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - localOffset);
    return localDate;
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <Typography variant="body2" mb={1}>
            {message.content}
          </Typography>
        );
      case 'image':
        return (
          <img
            src={message.content}
            alt="Sent image"
            style={{
              width: '300px',
              borderRadius: '8px',
            }}
          />
        );
      case 'audio':
        return (
          <audio controls>
            <source src={message.content} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return (
          <Typography variant="body2">Unsupported message type</Typography>
        );
    }
  };

  React.useEffect(() => {
    if (read?.last_read_message_id) {
      setVisualizedMessages((prev) => {
        const updated = new Set(prev);
        updated.add(read.last_read_message_id as string);
        return updated;
      });
    }
  }, [read]);

  const isVisualized = visualizedMessages.has(message.id);

  return (
    <MessageBoxStyled isUser={isUser}>
      <Box className="textBox">
        {renderMessageContent()}
        <Typography
          variant="caption"
          fontSize={10}
          lineHeight={0.5}
          sx={{ display: 'block', mt: 0.5 }}
        >
          {EUser[message.user_id as keyof typeof EUser]} -{' '}
          {format(
            adjustTimezone(message.timestamp as string),
            'dd/MM/yyyy HH:mm'
          )}
        </Typography>
        {isUser && isVisualized && (
          <Box display="flex" alignItems="center" mt={0.5}>
            <DoneAllIcon sx={{ fontSize: 15, color: '#0083ff' }} />
            <Typography
              ml={0.5}
              mt={0.2}
              variant="caption"
              fontSize={10}
              sx={{ color: '#0083ff' }}
            >
              Visualizada
            </Typography>
          </Box>
        )}
      </Box>
    </MessageBoxStyled>
  );
};

export default MessageBox;
