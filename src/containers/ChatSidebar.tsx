import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from '@/redux/features/user/userApi';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from '@/utils/localstorage';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<{ myData: any; otherData: any }> = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: allUsers } = useGetAllUsersQuery(searchValue);
  const { data: myProfile } = useGetMyProfileQuery('');
  const user = JSON.parse(getFromLocalStorage('user-info')!);
  const handleLogOut = () => {
    removeFromLocalStorage('user-info');
    removeFromLocalStorage('access-token');
    window.location.reload();
  };

  const allUsersExpectMe = allUsers?.data?.filter(
    (user: any) => user?.email !== myProfile?.data?.email
  );

  const handleFindUser = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="min-h-screen mt-10 w-[260px] overflow-y-auto h-full">
      <div className="flex items-center justify-between px-2">
        <Link to="/">
          <BiLeftArrowAlt />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                className="object-contain bg-slate-800"
                src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user?.name && (
              <DropdownMenuItem className="cursor-pointer">
                {user?.name}
              </DropdownMenuItem>
            )}

            {user?.email && (
              <DropdownMenuItem className="cursor-pointer">
                {user?.email}
              </DropdownMenuItem>
            )}

            {!user?.email && (
              <>
                <Link to="/login">
                  <DropdownMenuItem className="cursor-pointer">
                    Login
                  </DropdownMenuItem>
                </Link>

                <Link to="/signup">
                  <DropdownMenuItem className="cursor-pointer">
                    Sign Up
                  </DropdownMenuItem>
                </Link>
              </>
            )}

            {user?.email && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleLogOut()}
              >
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-center flex gap-2 items-center justify-center my-5 w-11/12 mx-auto">
        <input
          type="text"
          placeholder="Search UserName or Email"
          onChange={(e) => handleFindUser(e)}
          className="border px-2 py-1 rounded-md border-blue-500 w-full max-w-xs text-xs"
        />
      </div>
      <div className="w-11/12 mx-auto">
        {allUsersExpectMe?.map((user: any) => (
          <Link
            to={myProfile ? `/chat?email=${user?.email}` : `/login`}
            key={user?.id}
          >
            <div className="flex justify-between hover:bg-slate-100 items-center border-b-2 rounded-md p-2 cursor-pointer">
              <div className="flex items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png"
                  alt={user?.name}
                  className="w-8 h-8 border p-[2px] rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">
                    {user?.email.length > 18
                      ? user?.email?.slice(0, 18) + '...'
                      : user?.email}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
