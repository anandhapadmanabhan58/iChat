import { useState, useEffect, useRef } from 'react';
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
import io from 'socket.io-client';
import Lottie from 'lottie-react';

import TypingAnimation from '../animation/typing.json';
import ScrollableChat from './ScrollableChat';
import { ChatState } from '../context/ChatProvider';
import { getSender, getSenderUser } from '../config/ChatLogics';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UpdateGroupChatModal from './ui/UpdateGroupChatModal';
import ProfileModal from './ui/ProfileModal';
import './Styles.css';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const ENDPOINT = 'http://localhost:5000';

  const selectedChatCompare = useRef(null);
  const socket = useRef(null);

  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const toast = useToast();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit('setup', user);
    socket.current.on('connection', () => {
      setSocketConnected(true);
    });
    socket.current.on('typing', () => setIsTyping(true));
    socket.current.on('stop typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.current.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare.current || // if chat is not selected or doesn't match current chat
        selectedChatCompare.current._id !== newMessageRecieved.chat._id
      ) {
        setFetchAgain(!fetchAgain);
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
    setMessages(data);
    setLoading(false);
    socket.current.emit('join chat', selectedChat._id);

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

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.current.emit('stop typing', selectedChat._id);

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
        socket.current.emit('new message', data);
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

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);

      socket.current.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
              {isTyping ? (
                <Lottie
                  style={{ width: '70px', marginBottom: '15px', marginLeft: 0 }}
                  animationData={TypingAnimation}
                />
              ) : (
                <></>
              )}

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
