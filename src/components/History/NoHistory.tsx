import { Box, Paper, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { useDrawer } from '../../contexts/DrawerContext/DrawerContext';
import Footer from './Footer';
import Animation from '../../assets/empty-message-animation.json';
import { onSendProps } from '../../types/Chat';

interface NoHistoryProps {
  onSend: ({ type, content }: onSendProps) => Promise<void>;
}

const NoHistory = ({ onSend }: NoHistoryProps) => {
  const { open } = useDrawer();
  const drawerWidth = open ? 240 : 65;

  return (
    <Paper
      elevation={1}
      sx={{
        width: `calc(100vw - ${drawerWidth + 300}px)`,
        bgcolor: '#f2f2f2',
        p: 2,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box width={300} height="calc(100vh - 100px)">
        <Lottie animationData={Animation} loop={true} />
        <Box textAlign="center" position="relative" top={-25}>
          <Typography variant="h5" fontWeight={700}>
            Ops!!
          </Typography>
          <Typography>Não existem mensagens para serem exibidas.</Typography>
        </Box>
      </Box>
      <Footer onSend={onSend} />
    </Paper>
  );
};

export default NoHistory;
