import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import { RecoilRoot } from "recoil";

function App() {
  // Define the routes directly as an array of objects
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    }
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
