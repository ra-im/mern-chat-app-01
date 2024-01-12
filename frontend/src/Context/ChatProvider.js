// the chatProvider is a state management context API that
// will be used here to manage and share state data across
// various comoponents in a more organized and efficient manner.

import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { useHistory } from 'react-router-dom';

// we initiate the context using createContext from react
const ChatContext = createContext();

// create the context component
const ChatProvider = ({ children }) => {
	const [user, setUser] = useState(); // manage/share the state of user data
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);

	const history = useHistory();

	// on refreshing the page
	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem('userDetails'));

		setUser(userDetails);

		//if (!userDetails) {
		//	history.push('/');
		//}
	}, [history]);
	
	return (
		<ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
			{children}
		</ChatContext.Provider>
	)
};

// creating a custom hook that allows components to
// access the chat context using the 'useContext' hook from react
export const useChatState = () => {

	return useContext(ChatContext);
}

export default ChatProvider;
