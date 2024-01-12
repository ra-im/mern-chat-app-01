import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoader = () => {
	return (
		<Stack>
			<Skeleton height='38px' />
			<Skeleton height='45px' />
			<Skeleton height='40px' />
			<Skeleton height='48px' />
			<Skeleton height='38px' />
			<Skeleton height='45px' />
			<Skeleton height='40px' />
			<Skeleton height='48px' />
			<Skeleton height='38px' />
			<Skeleton height='45px' />
			<Skeleton height='40px' />
			<Skeleton height='48px' />
		</Stack>
	)
}

export default ChatLoader
