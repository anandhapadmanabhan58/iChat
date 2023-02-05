import React from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';

import { ChatState } from '../context/ChatProvider';
import { getSender, getSenderUser } from '../config/ChatLogics';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UpdateGroupChatModal from './ui/UpdateGroupChatModal';
import ProfileModal from './ui/ProfileModal';
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '25px', md: '28px' }}
            fontWeight="bold"
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}{' '}
                <ProfileModal user={getSenderUser(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            height="100%"
            width="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* {messges} */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={4}>
            Welcome To i-Message
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
