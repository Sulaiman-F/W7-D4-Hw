import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../componetn/Nav";
import Footer from "../componetn/Footer";
import Home from "../page/Home";
import Characters from "../page/Characters";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
function Layout() {
  return (
    <>
      <Nav />
      <div className=" h-13 lg:h-16"></div>
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home/characters", element: <Characters /> },
    ],
  },
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
