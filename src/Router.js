import {createBrowserRouter} from "react-router-dom";
import Home from "./App/Home/UI/Home.tsx";
import CreateStore from "./App/CreateStorage/UI/CreateStorage.tsx";
import StorageInfo from "./App/StorageInfo/UI/StorageInfo.tsx";
import ErrorPage from "./Pages/ErrorPage/UI/ErrorPage.tsx";
import LoginPage from "./Pages/LoginPage/UI/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage/UI/RegisterPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement : <ErrorPage/>
  },
  {
    path: '/createStorage',
    element: <CreateStore/>,
  },
  {
    path: '/storageInfo/:id',
    element: <StorageInfo/>
  },
  {
    path : '/login',
    element : <LoginPage/>
  },
  {
    path : '/register',
    element : <RegisterPage/>
  }
]);
  