/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from '@/utils/localstorage';

export default function Navbar() {
  const user = JSON.parse(getFromLocalStorage('user-info')!);
  const handleLogOut = () => {
    removeFromLocalStorage('user-info');
    removeFromLocalStorage('access-token');
    window.location.reload();
  };
  return (
    <nav className="w-full h-[10vh] fixed top backdrop-blur-lg z-10">
      <div className="h-full w-11/12 md:w-10/12 lg:max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between w-full h-full mx-auto">
          <div>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              {!user?.email ? (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signup">SignUp</Link>
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Button onClick={() => handleLogOut()} variant="link" asChild>
                    <Link to="">Log Out</Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="ml-5">
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
