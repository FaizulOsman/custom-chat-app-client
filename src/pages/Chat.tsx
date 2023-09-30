import {
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetChatByEmailQuery,
  useUpdateChatMutation,
} from '@/redux/features/chat/chatApi';
import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './style.css';
import { debounce } from 'lodash';
import { BiSmile } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import Sidebar from '@/containers/ChatSidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  content: string;
  sender: 'user' | 'other';
  myEmail: string;
  userEmail: any;
  name: string;
  reaction?: number;
}

const Chat: React.FC<{ message: any }> = ({ message }) => {
  const { data: getMyProfile } = useGetMyProfileQuery('');
  const isUserMessage = message.myEmail === getMyProfile?.data?.email;
  const [isReactionShow, setIsReactionShow] = useState(false);
  const [deleteChat] = useDeleteChatMutation();
  const [updateChat] = useUpdateChatMutation();
  const handleReactionClick = (id: any, e: any) => {
    const reaction: any = { reaction: e };
    updateChat({ reaction, id });
  };

  const handleDeleteChat = (id: any) => {
    deleteChat(id);
    toast.success('Successfully deleted the message.');
  };

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
        className={`max-w-xs p-1 rounded-lg relative ${
          isUserMessage
            ? 'bg-[#005c4b] text-white message-right'
            : 'bg-gray-200 message-left'
        }`}
      >
        <ScrollToBottom>
          <div>
            <div>
              <div>{message.content}</div>
              <div className="text-xs text-right pl-7">{message?.time}</div>
            </div>
            <div
              onClick={() => setIsReactionShow(!isReactionShow)}
              className={`absolute cursor-pointer ${
                isUserMessage ? 'right-full mr-2' : 'left-full ml-2'
              }  top-1/3 text-gray-600`}
            >
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BiSmile className="text-white" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="flex justify-around">
                      <button
                        onClick={() => handleReactionClick(message?.id, 1)}
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleReactionClick(message?.id, 2)}
                      >
                        ❤️
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {isUserMessage && (
              <div
                className={`absolute cursor-pointer ${
                  isUserMessage ? 'right-full mr-6' : 'left-full ml-6'
                }  top-1/3 text-gray-600`}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MdDeleteOutline className="text-white" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <h4 className="font-semibold mb-2 text-sm">
                      Do you want to delete the message?
                    </h4>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeleteChat(message?.id)}
                        className="border bg-red-600 text-xs text-white rounded-md px-2"
                      >
                        Yes
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            {message?.reaction > 0 && (
              <div
                onClick={() => handleReactionClick(message?.id, 0)}
                className={`absolute cursor-pointer text-xs ${
                  isUserMessage ? 'right-0' : 'left-0'
                } bottom-[-18px] bg-[#292440] rounded-full p-[1px] border border-gray-400`}
              >
                {message?.reaction === 1 && '👍'}
                {message?.reaction === 2 && '❤️'}
              </div>
            )}
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
        reaction: 0,
      };
      setNewMessage('');
      console.log(newChatMessage);
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
      <div className="bg-[#151030] p-4 flex flex-col flex-1 max-h-[100vh]">
        <div
          ref={chatContainerRef}
          className="border pt-5 pb-3 bg-[#050816] border-gray-500 rounded-lg max-h-[100vh] min-h-[50vh] flex-1 overflow-y-scroll mb-4"
        >
          {allChatMessages?.length < 1 && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h3 className="text-gray-600 text-xl font-bold">
                No message found!
              </h3>
              <p className="text-gray-600">Start chat...</p>
            </div>
          )}
          <div>
            <div className="flex items-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                alt="sssssssssss"
                className="w-8 h-8 border p-[2px] rounded-full mr-3"
              />
              {/* <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">
                    {user?.email.length > 18
                      ? user?.email?.slice(0, 18) + '...'
                      : user?.email}
                  </p>
                </div> */}
            </div>
          </div>
          {allChatMessages?.map((message: any) => (
            <Chat key={message?.id} message={message} />
          ))}
        </div>
        {isTyping && <div className="text-xs">User is typing...</div>}
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-lg p-2 mr-2 bg-[#050816] border border-gray-500 text-white"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleInputChange(e);
              debouncedHandleInputChange(e);
            }}
          />
          <div
            onClick={handleSendMessage}
            className="border-2 border-blue-500 rounded-full px-3 py-2 bg-blue-500 flex items-center justify-center cursor-pointer"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
