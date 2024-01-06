import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import Signin from '../components/Auth/Signin';
import Signup from '../components/Auth/Signup';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

	// on refreshing the page
  useEffect(() => {
    // if userDetails exists in local storage, it implies that
    // user is logged in
		const isLoggedIn = JSON.parse(localStorage.getItem('userDetails'));

    // auto  redirect user to chat page if logged in
		if (isLoggedIn) {
			history.push('/chats');
		}
	}, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent={'center'}
        textAlign={'center'}
        m={'40px 0 15px 0'}
        p={3}
        w={'100%'}
        borderRadius={'lg'}
        bg={'white'}
        color={'custom.primary'}
      >
        <Text
          fontSize={'8xl'}
          fontFamily={'heading'}
          fontWeight={'bold'}
        >chatz</Text>
      </Box>

      <Box
        w={'100%'}
        p={6}
        bg={'white'}
        borderRadius={'lg'}

      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb={'1.2em'}>
            <Tab w={'50%'}>Sign in</Tab>
            <Tab w={'50%'}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Signin />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage;
