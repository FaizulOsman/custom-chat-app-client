import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data: allUsers } = useGetAllUsersQuery('');
  const { data: myProfile } = useGetMyProfileQuery('');

  const allUsersExpectMe = allUsers?.data?.filter(
    (user: any) => user?.email !== myProfile?.data?.email
  );

  return (
    <div className="min-h-screen mt-10">
      <h1 className="text-2xl font-semibold text-center text-blue-700">
        All Users
      </h1>
      <div className="w-8/12 mx-auto">
        {allUsersExpectMe?.map((user: any) => (
          <Link to={`chat?email=${user?.email}`} key={user?.id}>
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
