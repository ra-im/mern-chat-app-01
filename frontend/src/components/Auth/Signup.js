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
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const [showPasswd, setShowPasswd] = useState(false)
    const [showConPasswd, setShowConPasswd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast();
    
    const handleClick1 = () => setShowPasswd(!showPasswd)
    const handleClick2 = () => setShowConPasswd(!showConPasswd)
    const uploadImage = (pics) => {
        setIsLoading(true);

        // handle undefined image type
        if (pics === undefined) {
            toast({
                title: 'Select an image',
                duration: 5500,
                status: 'warning',
                position: 'bottom',
                isClosable: true
            })

            return;
        }

        // handle image type (png or jpeg)
        if (pics.type === 'image/png' || pics.type === 'image/jpeg') {
            const data = new FormData;

            data.append('file', pics);
            data.append('upload_preset', 'chatz-hye');
            data.append('cloud_name', 'raim');

            // make a 'fetch' api call to clodinary basr api url
            fetch('https://api.cloudinary.com/v1_1/raim/image/upload', {
                method: 'post',
                body: data
            })
            .then((res) => res.json()) // convert response to json fmt
            .then((data) => {
                setPic(data.url.toString());
                setIsLoading(false);

                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        } else {
            toast({
                title: 'Select a valid image (jpeg/png)',
                duration: 5500,
                status: 'warning',
                position: 'bottom',
                isClosable: true
            })
        }
    }

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
                isLoading={isLoading}
            >
                Sign up
            </Button>
        </VStack>
    )
}

export default Signup