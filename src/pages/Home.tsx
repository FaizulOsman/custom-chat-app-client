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
      <h1 className="text-3xl font-bold text-center">All Users</h1>
      <div className="w-8/12 mx-auto">
        {allUsersExpectMe?.map((user: any) => (
          <Link to={`chat?email=${user?.email}`} key={user?.id}>
            <div className="bg-blue-400 mt-4 rounded-md p-4 cursor-pointer">
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
