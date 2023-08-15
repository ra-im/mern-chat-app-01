import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [showPasswd, setShowPasswd] = useState(false)
    const [showConPasswd, setShowConPasswd] = useState(false)
    
    const handleClick1 = () => setShowPasswd(!showPasswd)
    const handleClick2 = () => setShowConPasswd(!showConPasswd)
    const handleSubmit = () => {

    }
    const uploadImage = (pics) => {

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
                            onClick={handleClick1}
                        >
                            {showPasswd ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            // confirm password
            <FormControl isRequired id='confirm-passwd'>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Re-type your password...'
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        type={showConPasswd ? 'text' : 'password'}
                    />
                    <InputRightElement>
                        <Button
                            onClick={handleClick2}
                        >
                            {showPasswd ? <FaEyeSlash className='icon' /> : <FaEye className='icon' />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            // choose profile photo
            <FormControl id='pic'>
                <FormLabel>
                    Photo
                </FormLabel>
                <Input
                    onChange={(e) => {
                        uploadImage(e.target.files[0]);
                    }}
                    type={'file'}
                    accept='image/*'
                />
            </FormControl>

            // sign up Button
            <Button
                onClick={handleSubmit}
                bg={"custom.accent"}
                style={{marginTop: 15}}
                width={'100%'}
            >
                Sign up
            </Button>
        </VStack>
    )
}

export default Signup