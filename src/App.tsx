// import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/Notfound";
import Layout from "./components/Layout";
import TailwindIndicator from "./components/TailwindIndicator";
import UserList from "./pages/UsersList";

function App() {
  return (
    <>
      <Routes>
        {/* Wrapper */}
        <Route element={<Layout />}>
          {/* Homepage →  user list */}
          <Route path="/" element={<UserList />} />
          {/* path not match → Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <TailwindIndicator />
    </>
  );
}

export default App;
