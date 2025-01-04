import * as React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Avatar,
} from '@mui/material';
import { AvatarStyled } from './User.styled';
import { EStatus, Message } from '../../types/Chat';

interface User {
  label: string;
  value: string;
}

interface UserProps {
  user: User;
  selectUser: string;
  setSelectUser: (newValue: string) => void;
  status: Message | null;
}

const User = ({ selectUser, user, setSelectUser, status }: UserProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectUser(event.target.value);
  };

  const userStatus =
    status?.user_id === user.value ? status?.status : 'offline';

  return (
    <Box
      component="ul"
      sx={{
        backgroundColor: selectUser === user.value ? '#ff7a55' : 'transparent',
        color: selectUser === user.value ? '#fff' : '#000',
        borderRadius: 1,
        '&:hover': {
          backgroundColor: selectUser !== user.value ? 'lightgray' : '#ff7a55',
        },
        padding: '8px 0px 8px 16px',
        margin: 0,
        cursor: 'pointer',
      }}
    >
      <FormControl>
        <RadioGroup
          name="users-radio-group"
          value={selectUser}
          onChange={handleChange}
        >
          <FormControlLabel
            value={user.value}
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <Box key={user.value} component="li" width={200}>
                <Box display="flex" alignItems="center">
                  <AvatarStyled status={userStatus}>
                    <Avatar>{user.label.split('')[0]}</Avatar>
                  </AvatarStyled>
                  <Box ml={1} mt={2}>
                    <Typography variant="body2" lineHeight={0.5}>
                      {user.label}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {EStatus[userStatus as keyof typeof EStatus] ?? 'offline'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default User;
