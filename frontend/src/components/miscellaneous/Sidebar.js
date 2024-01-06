import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip
} from '@chakra-ui/react';
import { AddIcon, BellIcon, ChevronDownIcon, EditIcon, ExternalLinkIcon, QuestionOutlineIcon, RepeatIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useChatState } from '../../Context/ChatProvider';
import ProfileLayout from './ProfileLayout';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {

	// define states
	// define loading states
	const [isLoading, setIsLoading] = useState(false);
	// define loading state for displaying chats
	const [isLoadingChat, setisLoadingChat] = useState(false);
	// define state of searchUser keyword
	const [searchUser, setSearchUser] = useState('');
	// define the state of the searchUser keyword array of posible results
	const [searchUserResult, setSearchUserResult] = useState([]);

	const { user } = useChatState();

	const history = useHistory();

	// handle user signout
	const handleSignout = () => {
		// remove the user details from te local storage
		localStorage.removeItem('userDetails');
		history.push('/');
	}
	
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
		</div>
	)
}

export default Sidebar;
