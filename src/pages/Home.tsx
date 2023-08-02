import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { useState } from 'react';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { data: allUsers } = useGetAllUsersQuery(searchValue);
  const { data: myProfile } = useGetMyProfileQuery('');

  const allUsersExpectMe = allUsers?.data?.filter(
    (user: any) => user?.email !== myProfile?.data?.email
  );

  const handleFindUser = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-2xl font-semibold text-center text-blue-700">
        All Users
      </h1>
      <div className="text-center flex gap-2 items-center justify-center my-5">
        <input
          type="text"
          placeholder="Search UserName or Email"
          onChange={(e) => handleFindUser(e)}
          className="input input-bordered border-blue-500 w-full max-w-xs"
        />
        <div className="border-2 border-blue-500 rounded-full p-2 bg-blue-500 text-white">
          {/* <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg> */}
          <HiOutlineSearch />
        </div>
      </div>
      <div className="w-11/12 sm:w-8/12 mx-auto">
        {allUsersExpectMe?.map((user: any) => (
          <Link
            to={myProfile ? `chat?email=${user?.email}` : `/login`}
            key={user?.id}
          >
            <div className="flex justify-between hover:bg-slate-100 items-center mb-2 shadow-md mt-4 rounded-md p-4 cursor-pointer">
              <div className="flex items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                  alt={user?.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="font-bold text-blue-600 hover:underline">
                Chat
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
