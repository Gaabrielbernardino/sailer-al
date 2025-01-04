import { Box } from '@mui/system';
import styled from '@mui/system/styled';

interface AvatarStyledProps {
  status?: string | null;
}

export const AvatarStyled = styled(Box)<AvatarStyledProps>(
  ({ theme, status }) => ({
    position: 'relative',
    zIndex: 1,

    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 2,
      bottom: 2,
      right: 2,
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor:
        status === 'online'
          ? theme.palette.success.light
          : theme.palette.grey[500],
    },
  })
);
