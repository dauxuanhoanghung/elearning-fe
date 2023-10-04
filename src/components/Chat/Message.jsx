import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ message, isMyMessage }) => {
  return (
    <Box display='flex' justifyContent={isMyMessage ? 'flex-end' : 'flex-start'} marginBottom='8px'>
      <Box
        bgcolor={isMyMessage ? 'primary.main' : 'grey.300'}
        color={isMyMessage ? 'white' : 'text.primary'}
        borderRadius='8px'
        padding='8px 12px'
        maxWidth='100%'
      >
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
};

export default Message;