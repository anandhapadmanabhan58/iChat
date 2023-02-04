import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = ChatState();

  const toast = useToast();
  const history = useHistory();

  const onSetName = (e) => {
    setName(e.target.value);
  };
  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const onSetConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const showClick = () => {
    setShow(!show);
  };

  //image upload to cloudinary TODO: change to multer based
  const postDetails = (picture) => {
    setLoading(true);
    if (picture === undefined) {
      toast({
        title: 'Upload an Image',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      });
      return;
    }
    if (picture.type === 'image/jpeg' || picture.type === 'image/png') {
      const data = new FormData();
      data.append('file', picture);
      data.append('upload_preset', 'iMessage');
      data.append('cloud_name', 'dvvfupf8m');

      fetch('https://api.cloudinary.com/v1_1/dvvfupf8m/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Upload an Image',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      });
      setLoading(false);
      return;
    }
  };

  //form submission
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      toast({
        title: 'Please fill the info',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'incorrect Password',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const setHeaders = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const result = await axios.post(
        '/api/v1/user',
        { name, email, password, pic },
        setHeaders
      );
      toast({
        title: 'Registration completed',
        status: 'Success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(result.data));
      history.push('/chats');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input id="name" placeholder="Enter Name" onChange={onSetName} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enteryour Email ID"
          onChange={onSetEmail}
        />
      </FormControl>

      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter your Password"
            onChange={onSetPassword}
          />
          <InputRightElement width="4rem">
            <Button h="1.75rem" size="sm" onClick={showClick}>
              {show ? 'Hide' : 'show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter your Password"
            onChange={onSetConfirmPassword}
          />
          <InputRightElement width="4rem">
            <Button h="1.75rem" size="sm" onClick={showClick}>
              {show ? 'Hide' : 'show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="profile-pic" isRequired>
        <FormLabel>Upload DP</FormLabel>
        <Input
          type="file"
          p={2}
          border="none"
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="green"
        w="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
