import { Outlet } from 'react-router-dom';

export default function ChatLayout() {
  return (
    <div>
      <div className="pt-[10vh]">
        <Outlet />
      </div>
    </div>
  );
}
