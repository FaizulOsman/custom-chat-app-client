import {
  useCreateChatMutation,
  useGetChatByEmailQuery,
} from '@/redux/features/chat/chatApi';
import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './style.css';
import { debounce } from 'lodash';

interface Message {
  content: string;
  sender: 'user' | 'other';
  myEmail: string;
  userEmail: any;
  name: string;
}

const Chat: React.FC<{ message: any }> = ({ message }) => {
  const { data: getMyProfile } = useGetMyProfileQuery('');
  const isUserMessage = message.myEmail === getMyProfile?.data?.email;
  return (
    <div
      className={`flex p-2 ${isUserMessage ? 'justify-end' : 'justify-start'}`}
    >
      {isUserMessage || (
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
          alt="test"
          className="w-8 h-8 rounded-full mr-3 border-2 p-[1px]"
        />
      )}

      <div
        className={`max-w-xs p-3 rounded-lg  ${
          isUserMessage
            ? 'bg-green-400 text-white message-right'
            : 'bg-gray-200 message-left'
        }`}
      >
        <ScrollToBottom>
          <div>
            <div>{message.content}</div>
            <div className="text-xs text-right">{message?.time}</div>
          </div>
        </ScrollToBottom>
      </div>
      {isUserMessage && (
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
          alt="test"
          className="w-8 h-8 rounded-full ml-3 border-2 p-[1px]"
        />
      )}
    </div>
  );
};

const Sidebar: React.FC<{ myData: any; otherData: any }> = ({
  myData,
  otherData,
}) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 h-[600px] w-60 hidden sm:block">
      <h2 className="font-bold text-lg mb-4 text-center">My Profile</h2>
      <div key={myData?.id} className="flex items-center mb-2">
        <img
          src={myData?.profileImage}
          alt={myData?.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{myData?.name}</p>
          <p className="text-sm text-gray-500">{myData?.status}</p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4 mt-10 text-center">User Profile</h2>
      <div key={otherData?.id} className="flex items-center mb-2">
        <img
          src={otherData?.profileImage}
          alt={otherData?.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{otherData?.name}</p>
          <p className="text-sm text-gray-500">{otherData?.status}</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email');

  const { data: chatData, refetch: chatDataRefetch } =
    useGetChatByEmailQuery(email);

  const [newMessage, setNewMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState([]);

  const { data: myProfile } = useGetMyProfileQuery('');

  const [createChat, { data, isSuccess }] = useCreateChatMutation();

  useEffect(() => {
    setChatMessages(chatData?.data);
  }, [chatData, isSuccess]);

  let allChatMessages: any = chatMessages;
  if (data) {
    allChatMessages = [...chatMessages];
  }
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage: Message = {
        content: newMessage,
        sender: 'user',
        myEmail: myProfile?.data?.email,
        userEmail: email,
        name: myProfile?.data?.name,
      };
      // setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');

      createChat(newChatMessage);
    }
  };

  const { data: allUsers } = useGetAllUsersQuery('');
  const userProfile = allUsers?.data?.find(
    (user: any) => user?.email === email
  );

  const myData: any = {
    id: 1,
    name: myProfile?.data?.name,
    profileImage:
      'https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png',
    status: myProfile?.data?.email,
  };
  const otherData: any = {
    id: 2,
    name: userProfile?.name,
    profileImage:
      'https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png',
    status: userProfile?.email,
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Step 4: Scroll to the bottom of the container whenever new messages are added or the component mounts
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allChatMessages]);

  const refreshInterval = 0;
  useEffect(() => {
    const autoRefresh = () => {
      chatDataRefetch();
    };
    const refreshTimer = setInterval(autoRefresh, refreshInterval);

    return () => clearInterval(refreshTimer);
  }, []);

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | number | null
  >(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typing = e.target.value.trim() !== '';
    setIsTyping(typing);

    // Clear typing status after 2 seconds of inactivity
    if (typingTimeout) {
      clearTimeout(typingTimeout as NodeJS.Timeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
      }, 1000)
    );
  };
  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout as NodeJS.Timeout);
      }
    };
  }, [typingTimeout]);

  const debouncedHandleInputChange = debounce(handleInputChange, 1000);

  return (
    <div className="flex">
      <Sidebar myData={myData} otherData={otherData} />
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col flex-1">
        <div
          ref={chatContainerRef}
          className="border bg-white border-gray-300 rounded-lg max-h-[500px] flex-1 overflow-y-scroll mb-4"
        >
          {allChatMessages?.map((message: any) => (
            <Chat key={message?.id} message={message} />
          ))}
        </div>
        {isTyping && <div className="text-xs">User is typing...</div>}
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-lg p-2 mr-2 border border-gray-300"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleInputChange(e);
              debouncedHandleInputChange(e);
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
