import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      history.push('/chats');
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        shadow="5xl"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text color="#38A169" fontWeight="bold" fontSize="2xl">
            I chat
          </Text>
          <Text fontWeight="light" fontSize="xs">
            Any time, anywhere.
          </Text>
        </div>
      </Box>

      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
        shadow="2xl"
      >
        <Tabs variant="enclosed" border="white" colorScheme="green">
          <TabList>
            <Tab fontWeight="semibold" w="75%">
              Login
            </Tab>
            <Tab fontWeight="semibold" w="75%">
              Signup
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login />}</TabPanel>
            <TabPanel>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
