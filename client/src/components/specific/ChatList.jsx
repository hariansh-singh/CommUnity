import { Stack } from '@mui/material';
import React from 'react'
import ChatItem from '../shared/ChatItem';

function ChatList({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
      {
        ChatId: "",
        count: 0,
      },
    ],
    handleDeleteChat,
  }) {
    return (
      <Stack width={w} direction={"column"}>
        {chats?.map((data) => {
          return <ChatItem />;
        })}
      </Stack>
    );
  }

export default ChatList