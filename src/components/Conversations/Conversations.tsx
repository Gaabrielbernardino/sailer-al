import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Users from '../User/User';
import { GetUsers } from '../../services/get';
import SearchIcon from '@mui/icons-material/Search';
import { Chats, MessageSocket, User } from '../../types/Chat';

interface ConversationsProps {
  selectUser: string;
  setSelectUser: (value: string) => void;
  onCreate: () => void;
  chats: Chats[];
  event?: MessageSocket;
}

const Conversations = ({
  selectUser,
  chats,
  event,
  setSelectUser,
  onCreate,
}: ConversationsProps) => {
  const { users } = GetUsers();
  const [search, setSearch] = React.useState('');
  const [createChat, setCreateChat] = React.useState(false);

  const filteredChats = chats.filter((chat) => {
    const user = users.find(
      (i: User) => i.value === chat.participants?.[1]
    ) as unknown as User;
    return user?.label?.toLowerCase().includes(search.toLowerCase());
  });

  const statusUser = React.useMemo(() => {
    if (event?.event === 'presence_updated') {
      return event.data;
    }
    return null;
  }, [event]);

  const handleCreate = () => {
    onCreate();
    setCreateChat(false);
  };

  return (
    <>
      <Paper elevation={1} sx={{ width: 300, height: '100vh', p: 2 }}>
        <Box mb={2}>
          <TextField
            placeholder="Buscar chat"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        {filteredChats.length ? (
          <>
            {filteredChats.map((e) => {
              const user = users.find(
                (i: User) => i.value === e.participants?.[1]
              ) as unknown as User;
              return (
                <>
                  <Divider />
                  <Users
                    status={statusUser}
                    selectUser={selectUser}
                    setSelectUser={setSelectUser}
                    user={user}
                  />
                </>
              );
            })}
          </>
        ) : (
          <Typography variant="body2">Sem resultados!</Typography>
        )}
        <Box position="fixed" bottom={10} width={270}>
          <Button
            variant="contained"
            sx={{ color: '#fff' }}
            fullWidth
            onClick={() => setCreateChat(true)}
          >
            Novo chat
          </Button>
        </Box>
      </Paper>
      {createChat && (
        <Dialog open={createChat} onClose={() => setCreateChat(false)}>
          <DialogTitle>Iniciar novo chat</DialogTitle>
          <DialogContent sx={{ width: 400 }}>
            {users
              .filter(
                (user: User) =>
                  !filteredChats.some((chat: Chats) =>
                    chat.participants?.includes(user.value)
                  )
              )
              .map((user: User) => (
                <Users
                  key={user.value}
                  status={statusUser}
                  selectUser={selectUser}
                  setSelectUser={setSelectUser}
                  user={user}
                />
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateChat(false)}>Fechar</Button>
            <Button
              onClick={handleCreate}
              variant="contained"
              sx={{ color: '#fff' }}
            >
              Iniciar chat
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Conversations;
