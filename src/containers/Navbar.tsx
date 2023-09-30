/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from '@/utils/localstorage';
import { Link } from 'react-router-dom';

export default function Navbar({ handleFindUser }: any) {
  const user = JSON.parse(getFromLocalStorage('user-info')!);

  const handleLogOut = () => {
    removeFromLocalStorage('user-info');
    removeFromLocalStorage('access-token');
    window.location.reload();
  };

  return (
    <div className="navbar p-0 bg-[#050816] text-white w-11/12 sm:w-8/12 mx-auto border-b-2 border-[#56526c]">
      <div className="flex-1">
        <Link to="/">
          <img
            src="https://i.ibb.co/xG1rNfX/png-clipart-livechat-online-chat-computer-icons-chat-room-web-chat-others-miscellaneous-blue-thumbna.png"
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control w-[180px] sm:w-[220px]">
          <input
            type="text"
            placeholder="Search UserName or Email"
            onChange={(e) => handleFindUser(e)}
            className="input px-2 input-sm sm:input-md w-full input-bordered border-blue-500 bg-[#1c134d] text-white"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full">
              <img
                src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                className="w-10 h-10 rounded-full border p-[2px]"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#1e1360] rounded-box w-52"
          >
            {user && (
              <>
                <li>
                  <a className="hover:bg-[#181042] hover:text-white">
                    Name: {user?.name}
                  </a>
                </li>
                <li>
                  <a className="hover:bg-[#181042] hover:text-white">
                    Email: {user?.email}
                  </a>
                </li>
              </>
            )}
            {user ? (
              <li>
                <a
                  onClick={() => handleLogOut()}
                  className="hover:bg-[#181042] hover:text-white"
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:bg-[#181042] hover:text-white"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
