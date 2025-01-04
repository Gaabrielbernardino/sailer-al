export interface Chats {
  chat_id: string;
  participants: null | string;
}

export interface User {
  label: string;
  value: string;
}

export interface Message {
  event?: string;
  id: string;
  user_id: string;
  type: string;
  content: string;
  timestamp: Date | string;
  status?: string;
  last_seen?: string;
  last_read_message_id?: string;
}

export interface MessageSocket {
  data: Message;
  event: string;
}

export interface onSendProps {
  content: string;
  type: 'text' | 'image' | 'audio' | string;
}

export enum EUser {
  bot_user = 'Bot Automático',
  user0 = 'Eu',
  user1 = 'Pedro',
  user2 = 'João',
  user3 = 'Gabriela',
  user4 = 'Maria',
  user5 = 'Eduardo',
  user6 = 'Mariana',
}

export enum EStatus {
  offline = 'offline',
  online = 'online',
  typing = 'digitando...',
}
