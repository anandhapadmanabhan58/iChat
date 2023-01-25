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

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const showClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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
    try {
      const setHeaders = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const result = await axios.post(
        '/api/v1/user/login',
        { email, password },
        setHeaders
      );
      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(result.data));
      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enteryour Email ID"
          onChange={onSetEmail}
        />
      </FormControl>

      <FormControl id="password" isRequired>
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

      <Button
        colorScheme="green"
        w="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
