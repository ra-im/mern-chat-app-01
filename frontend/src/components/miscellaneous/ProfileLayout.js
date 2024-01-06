import { ViewIcon } from '@chakra-ui/icons';
import {
	Button,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import React from 'react'

const ProfileLayout = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
					<IconButton
						onClick={onOpen}
						icon={<ViewIcon />}
						d={{base: 'flex'}}
					/>
			)}

			{/*modal for the user profile*/}
			<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={'350px'} bg={'custom.tertiary'}>
					<ModalHeader
						display={'flex'}
						justifyContent={'center'}
						fontFamily={'heading'}
						fontSize={'4xl'}
						fontWeight={'semibold'}
						pt={'30'}
					>{user.name}</ModalHeader>
          <ModalCloseButton />
					<ModalBody
						alignItems={'center'}
						display={'flex'}
						flexDir={'column'}
						pt={'31px'}
					>
						<Image
							src={user.pic}
							alt={user.name}
							boxSize={'100px'}
							borderRadius={'full'}
							border={'4px'}
							borderColor={'custom.primary'}
						/>
						<Text
							fontFamily={'body'}
							fontSize={'2xl'}
							pt={'8px'}
							
						>
							{user.email}
						</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
						{/*<Button
							variant='ghost'
							fontWeight={'semibold'}
						>
							Edit
						</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
		</>
	)
};

export default ProfileLayout;
