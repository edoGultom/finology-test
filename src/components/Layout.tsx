import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* outlet same with slot in RRV6 nested route */}
      <Outlet />
    </div>
  );
};

export default Layout;
