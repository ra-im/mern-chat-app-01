import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react';
import {
	BellIcon,
	ChevronDownIcon,
	EditIcon,
	QuestionOutlineIcon
} from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useChatState } from '../../Context/ChatProvider';
import { useDisclosure } from '@chakra-ui/hooks';
import { Spinner } from '@chakra-ui/spinner';
import ProfileLayout from './ProfileLayout';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoader from '../ChatComponents/ChatLoader';
import SearchUserResultList from '../ChatComponents/SearchUserResultList';

const Sidebar = () => {

	// define states
	// define loading states
	const [isLoading, setIsLoading] = useState(false);
	// define loading state for displaying chats
	const [isChatLoading, setIsChatLoading] = useState(false);
	// define state of searchUser keyword
	const [searchUser, setSearchUser] = useState('');
	// define the state of the searchUser keyword array of posible results
	const [searchUserResult, setSearchUserResult] = useState([]);

	const { user, setSelectedChat, chats, setChats } = useChatState();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const history = useHistory();

	// handle user signout
	const handleSignout = () => {
		// remove the user details from te local storage
		localStorage.removeItem('userDetails');
		history.push('/');
	}

	const toast = useToast();

	const handleSearch = async () => {
		if (!searchUser) {
			toast({
				title: "Input a search keyword",
				status: "warning",
				duration: 4000,
				position: "top-left",
				isClosable: true,
			});
			return;
		}

		try {
			setIsLoading(true);

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`/api/user?search=${searchUser}`, config);

			setIsLoading(false);
			setSearchUserResult(data);
		} catch (error) {
			toast({
				title: "Oops, an error occured!",
				description: "Unable to load the search result",
				status: "error",
				duration: 4000,
				position: "top-right",
				isClosable: true,
			});
		}
	};
	
	const fetchChat = async (userId) => {
		try {
			setIsChatLoading(true);

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.post('api/chat', { userId }, config);

			// if chats exists within the list, simply append it to data
			if (!chats.find((c) => c._id === data._id))
				setChats([data, ...chats]);

			setSelectedChat(data);
			setIsChatLoading(false);

			onClose();
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

	return (
		<div style={{background: 'grey'}}>
			<Box
				display={'flex'}
				bg={'custom.secondary'}
				p={'5px 10px'}
				justifyContent={'space-between'}
				w={'100%'}
				alignItems={'center'}
			>
				{/*this allows the tip functionality whenever the search is hovered on*/}
				<Tooltip
					closeOnClick
					label={'Search user'}
					placement={'bottom-end'}
				>
					<Button
						variant={'ghost'}
						onClick={onOpen} // opens the side drawer
					>
						<i class="fa fa-search" aria-hidden="true"></i>
						<Text
							style={{padding: '10px'}}
							d={{
								base: 'none',
								md: 'flex'
							}}
						>
							Search
						</Text>
					</Button>
				</Tooltip>

				<Text
					fontSize={'4xl'}
					fontFamily={'heading'}
					fontWeight={'bold'}
				>
					ChatZone
				</Text>

				<div style={{ d: 'flex' }}>
					{/*notification menu*/}
					<Menu>
						<MenuButton>
							<BellIcon fontSize={'2xl'} />
						</MenuButton>
						{/*<MenuList>
							**items
						</MenuList>*/}
					</Menu>

					{/*Menu icon/options button*/}
					<Menu>
					  <MenuButton
					    as={Button}
					    aria-label='Options'
							rightIcon={<ChevronDownIcon />}
							fontSize={'2xl'}
					    variant=''
						>
							<Avatar
								name={user.name}
								size={'sm'}
								background={'custom.tertiary'}
								src={user.pic}
								objectFit={'contain'}
							/>
						</MenuButton>
						<MenuList>
							<ProfileLayout user={user}>
						    <MenuItem >
									My profile
						    </MenuItem>
							</ProfileLayout>
							
							<MenuDivider />

					    <MenuItem icon={<EditIcon />} onClick={handleSignout}>
					      Signout
							</MenuItem>
					    <MenuItem icon={<QuestionOutlineIcon />}>
					      Help
							</MenuItem>
							
					  </MenuList>
					</Menu>
				</div>
			</Box>

			{/*Side Drawer*/}
			<Drawer
				placement='left'
				isOpen={isOpen} onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader
						borderBottomWidth={'1px'}
					>
						Search Users
					</DrawerHeader>

					<DrawerBody>
						<Box
							display={'flex'} pt={2} pb={2}
						>
							<Input
								mr={2}
								value={searchUser}
								placeholder="Input email or name"
								onChange={(e) => setSearchUser(e.target.value)}
							/>
							<Button
								onClick={handleSearch}
							>
								Go
							</Button>
						</Box>

						{isLoading ? (
							<ChatLoader />
						): (
							searchUserResult?.map(user => (
								<SearchUserResultList
									key={user._id}
									user={user}
									handleFunction={() => fetchChat(user._id)}
								/>
							))
						)}

						{isChatLoading && <Spinner ml={"auto"} mt={3} display={"flex"} />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</div>
	)
}

export default Sidebar;
