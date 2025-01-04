import * as React from 'react';
import axios from 'axios';
import { Chats, Message } from '../types/Chat';

export const GetUsers = () => {
  const [users, setUsers] = React.useState([]);

  const handleGetUsers = React.useCallback(async () => {
    try {
      const response = await axios.get('/users.json');
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return { users };
};

export const GetChats = () => {
  const [chats, setChats] = React.useState<Chats[]>([]);

  const handleGetChats = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_PUBLIC_API}/chats`
      );
      setChats(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    handleGetChats();
  }, [handleGetChats]);

  return { chats, handleGetChats };
};

export const GetHistoric = (id: string) => {
  const [historic, setHistoric] = React.useState<Message[]>([]);

  const handleGetHistoric = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_PUBLIC_API}/chats/${id}/messages`
      );
      setHistoric(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  React.useEffect(() => {
    if (id) handleGetHistoric();
  }, [id, handleGetHistoric]);

  return { historic };
};
