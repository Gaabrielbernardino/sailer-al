import * as React from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { onSendProps } from '../../types/Chat';

interface FooterProps {
  onSend: ({ type, content }: onSendProps) => Promise<void>;
}

const Footer = ({ onSend }: FooterProps) => {
  const [message, setMessage] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSend({ type: 'text', content: message });
      setMessage('');
    }
  };

  const handleSendMessageOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onSend({ type: 'image', content: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRecordAudio = async () => {
    if (isRecording) return;

    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        onSend({ type: 'audio', content: audioUrl });
        setIsRecording(false);
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 4000);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
      setIsRecording(false);
    }
  };

  return (
    <Box
      position="absolute"
      bottom={0}
      left={-1}
      width="100%"
      bgcolor="#fff"
      p={1}
    >
      <Box mb={1}>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          onChange={handleUploadImage}
        />
        <label htmlFor="upload-image">
          <IconButton size="small" component="span">
            <ImageIcon color="primary" />
          </IconButton>
        </label>
        <IconButton
          size="small"
          onClick={handleRecordAudio}
          disabled={isRecording}
        >
          <MicIcon color={isRecording ? 'secondary' : 'primary'} />
          {isRecording && (
            <Typography variant="caption">Gravando...</Typography>
          )}
        </IconButton>
      </Box>
      <Box>
        <TextField
          name="message"
          placeholder="Digite sua mensagem"
          fullWidth
          multiline
          minRows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSendMessageOnEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage}>
                  <SendIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
