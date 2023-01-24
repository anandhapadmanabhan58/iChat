import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const showClick = () => {
    setShow(!show);
  };

  const submitHandler = () => {};

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
        onChange={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
