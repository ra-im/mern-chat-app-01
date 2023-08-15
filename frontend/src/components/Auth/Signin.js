import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [showPasswd, setShowPasswd] = useState(false)
  
  const handleClick = () => setShowPasswd(!showPasswd)
  const handleSubmit = () => {

  }

  return (
    <VStack spacing={'6px'}>
      // username
      <FormControl isRequired id='username'>
          <FormLabel>
              Username
          </FormLabel>
          <Input
            placeholder='Input your name...'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
      </FormControl>

      // email
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
        />
      </FormControl>

      // password
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

      // sign up Button
      <Button
        onClick={handleSubmit}
        bg={"custom.accent"}
        style={{marginTop: 15}}
        width={'100%'}
      >
        Sign in
      </Button>

      // sign up as a GUEST Button
      <Button
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('1234')
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