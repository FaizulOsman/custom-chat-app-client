import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from '@/containers/Footer';
import Navbar from '@/containers/Navbar';
import Loader from '@/components/Loader';

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
    <div className="min-h-screen bg-[#050816]">
      <Navbar handleFindUser={handleFindUser} />

      <h1 className="mt-8 mb-5 text-2xl sm:text-3xl font-bold text-center text-white">
        All Users
      </h1>
      <div className="w-11/12 sm:w-8/12 mx-auto min-h-[70vh]">
        {allUsersExpectMe ? (
          <>
            {allUsersExpectMe?.map((user: any) => (
              <Link
                to={myProfile ? `chat?email=${user?.email}` : `/login`}
                key={user?.id}
              >
                <div className="flex justify-between bg-[#151030] text-white hover:bg-[#1a1345] items-center mb-2 shadow-md mt-4 rounded-md p-4 cursor-pointer">
                  <div className="flex items-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                      alt={user?.name}
                      className="w-10 h-10 rounded-full mr-3 border p-[2px]"
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
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
