import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPasswd, setShowPasswd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();
  
  const handleClick = () => setShowPasswd(!showPasswd);
  const handleSubmit = async () => {
    setIsLoading(true);

    // handle empty fields
    if (!email || !password) {
      toast({
        title: 'Fill up the required fields',
        duration: 5500,
        status: 'warning',
        position: 'top',
        isClosable: true
      })

      setIsLoading(false);
      return;
    }

    // make api requets to store image in mongoDB
    try {
      // configure the request headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        }
      }

      // make api request
      const { data } = await axios.post(
        '/api/user/signin', // api endpoint
        {
          email,
          password,
        },
        config // request header configuration
      );

      // alert success message
      toast({
        title: 'You have successfully signed up',
        duration: 5500,
        status: 'success',
        position: 'top',
        isClosable: true
      });

      // save data to local storage
      localStorage.setItem('userDetails', JSON.stringify(data));
      setIsLoading(false);

      // automatically redirect the user to the chats page
      history.push('/chats');
          
      // console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast({
        title: 'Oops, something went wrong...',
        description: error.response.data.message,
        duration: 5500,
        status: 'warning',
        position: 'top',
        isClosable: true
      });

      setIsLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={'6px'}>
      {/* username */}
      <FormControl isRequired id='username'>
          <FormLabel>
              Username
          </FormLabel>
          <Input
            placeholder='Input your name...'
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
      </FormControl>

      {/* email */}
      <FormControl isRequired id='email'>
        <FormLabel>
          E-mail
        </FormLabel>
        <Input
          placeholder='Input your e-mail...'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={'email'}
          value={email}
        />
      </FormControl>

      {/* password */}
      <FormControl isRequired id='passwd'>
        <FormLabel>
            Password
        </FormLabel>
        <InputGroup>
            <Input
              placeholder='Input your password...'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPasswd ? 'text' : 'password'}
              value={password}
            />
            <InputRightElement>
              <Button
                onClick={handleClick}
              >
                {showPasswd ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
      </FormControl>

      {/* sign up Button */}
      <Button
        onClick={handleSubmit}
        bg={"custom.accent"}
        style={{marginTop: 15}}
        width={'100%'}
        isLoading={isLoading}
      >
        Sign in
      </Button>

      {/* sign up as a GUEST Button */}
      <Button
        onClick={() => {
          setName('Guest User');
          setEmail('guest@example.com');
          setPassword('1234');
        }}
        bg={"custom.pop"}
        style={{marginTop: 15}}
        width={'100%'}
      >
        Sign in as a Guest User
      </Button>
    </VStack>
  )
}

export default Signin