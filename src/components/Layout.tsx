import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Outlet />
    </div>
  );
};

export default Layout;
