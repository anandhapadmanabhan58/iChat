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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);

  const onSetName = (e) => {
    setName(e.target.value);
  };
  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const showClick = () => {
    setShow(!show);
  };

  const postDetails = () => {};

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Name" onChange={onSetName} />
      </FormControl>

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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
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
        onChange={submitHandler}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
