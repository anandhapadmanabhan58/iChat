import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { SearchIcon, BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

import UserListItem from '../User/UserListItem';
import { ChatState } from '../../context/ChatProvider';
import ChatLoading from '../ChatLoading';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();

  const toast = useToast();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const signOutHandler = () => {
    localStorage.removeItem('userInfo');
    history.replace('/');
  };

  const onSearchHandler = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Enter a user',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Req Error',
        status: 'Error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const accessChat = async (userID) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/v1/chat`, { userID }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'API Error',
        description: error.message,
        status: 'Error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text d={{ base: 'none', md: 'flex' }} px="4">
              i Message
            </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl" margin="2"></BellIcon>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem> Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">i Message</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search user"
                value={search}
                mr={2}
                onChange={onSearchHandler}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id);
                  }}
                />
              ))
            )}
            {loadingChat && (
              <Box display="flex" justifyContent="center">
                <Spinner />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
