import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useChatState } from '../../Context/ChatProvider'

const SearchUserResultList = ({ user, handleFunction }) => {
	
	return (
		<Box
			w={'100%'}
			display={'flex'}
			alignItems='center'
			cursor='pointer'
			onClick={handleFunction}
			mt={2}
			bg={'custom.main'}
			borderRadius={'2xl'}
			p={2}
			_hover={{ opacity: 0.8 }}
      transition="opacity ease-in-out"

		>
			<Avatar
				name={user.name}
				src={user.pic}
				size={'sm'}
				mr={2}
				bg={'white'}
			/>

			<Box>
				<Text>{user.name}</Text>
				<Text fontSize={'xs'}>
					<b>Email: </b>
					{user.email}
				</Text>
			</Box>
		</Box>
	)
}

export default SearchUserResultList
