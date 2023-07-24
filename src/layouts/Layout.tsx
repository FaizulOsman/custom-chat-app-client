import { Outlet } from 'react-router-dom';
import Navbar from '../containers/Navbar';
import Footer from '../containers/Footer';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
