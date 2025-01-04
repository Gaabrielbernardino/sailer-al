import { Box } from '@mui/system';
import styled from '@mui/system/styled';

interface MessageBoxStyledProps {
  isUser: boolean;
}

export const MessageBoxStyled = styled(Box)<MessageBoxStyledProps>(
  ({ isUser }) => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: '1rem',
    '& .textBox': {
      maxWidth: '60%',
      backgroundColor: isUser ? '#d1e7dd' : '#dbd9d9',
      color: isUser ? '#0f5132' : '#333',
      borderRadius: '8px',
      padding: '8px',
      wordWrap: 'break-word',
    },
  })
);
