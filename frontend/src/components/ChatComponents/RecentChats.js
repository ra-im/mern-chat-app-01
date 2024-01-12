import React, { useEffect, useState } from 'react';
import { useChatState } from '../../Context/ChatProvider';
import {
	Box,
	Button,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoader from './ChatLoader';
import { getSender } from '../../config/chatfunctions';

const RecentChats = () => {
	const [loggedUser, setLoggedUser] = useState()
	const { user, chats, setChats, selectedChat, setSelectedChat } = useChatState();

	const toast = useToast();

	const fetchChat = async () => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.post('api/chat', config);

			setChats(data);
		} catch (error) {
			toast({
				title: "Oops, error occured while fetching chats",
				description: error.message,
				status: "error",
				duration: 4000,
				position: "bottom-left",
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userDetails")));

		fetchChat();
	}, [])
	
	return (
		<Box
			display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
			flexDir={"column"}
			w={{ base: "100%", md: "31%" }}
			p={3}
			alignItems={"center"}
			borderWidth={"4px"}
			borderRadius={"lg"}
		>
			<Box
				w={"100%"}
				display={"flex"}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				Recent Chats

				<Button
					rightIcon={<AddIcon />}
					display={"flex"}
				>
					New Group
				</Button>
			</Box>

			<Box>
				{chats ? (
					<Stack
						overflowY={'scroll'}
					>
						{chats.map((chat) => (
							<Box
								cursor={'pointer'}
								px={4}
								py={3}
								borderRadius={'lg'}
								key={chat.id}
								bg={selectedChat === chat ? 'custom.accent' : 'white'}
								onClick={() => (
									setSelectedChat(chat)
								)}
							>
								<Text>
									{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
								</Text>
							</Box>
						))}
					</Stack>
				) : (
						<ChatLoader />
				)}
			</Box>
		</Box>
	)
}

export default RecentChats;
