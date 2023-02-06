import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import ScrollableChat from './ScrollableChat';
import { ChatState } from '../context/ChatProvider';
import { getSender, getSenderUser } from '../config/ChatLogics';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UpdateGroupChatModal from './ui/UpdateGroupChatModal';
import ProfileModal from './ui/ProfileModal';
import './Styles.css';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    setLoading(true);
    const { data } = await axios.get(
      `/api/v1/message/${selectedChat._id}`,
      config
    );
    console.log(messages);
    setMessages(data);
    setLoading(false);
    try {
    } catch (error) {
      toast({
        title: 'Message Load error',
        description: error.message,
        status: 'Error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const { data } = await axios.post(
          '/api/v1/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: 'Message Load error',
          description: error.message,
          status: 'Error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing
  };
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
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderUser(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
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
            {loading ? (
              <Spinner alignSelf="center" margin="auto" />
            ) : (
              <>
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              </>
            )}

            <FormControl isRequired mt={3} onKeyDown={sendMessage}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message"
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
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
