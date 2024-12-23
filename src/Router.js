import {createBrowserRouter} from "react-router-dom";
import Home from "./App/Home/UI/Home.tsx";
import CreateStore from "./App/CreateStorage/UI/CreateStorage.tsx";
import StorageInfo from "./App/StorageInfo/UI/StorageInfo.tsx";
import ErrorPage from "./Pages/ErrorPage/UI/ErrorPage.tsx";
import LoginPage from "./Pages/LoginPage/UI/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage/UI/RegisterPage.tsx";
import UserPage from "./Pages/UserPage/UI/UserPage.tsx";
import { ViewItemStorage } from "./Widgets/ItemStorage/ViewItemStorage/UI/ViewItemStorage.tsx";
import { AddItemStorage } from "./Widgets/ItemStorage/AddItemStorage/UI/AddItemStorage.tsx";
import { AddCarStorage } from "./Widgets/CarStorage/AddCarStorage/UI/AddCarStorage.tsx";
import { ViewCarStorage } from "./Widgets/CarStorage/ViewCarStorage/UI/ViewCarStorage.tsx";
import DeliverisPage from "./Widgets/Deliveries/Page/UI/DeliveriesPage.tsx";

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
    element: <StorageInfo/>,
    children : [
      {
        path : '',
        element : <ViewItemStorage/>
      },
      {
        path : 'addItem',
        element : <AddItemStorage/>
      },
      {
        path : 'viewCars',
        element : <ViewCarStorage/>
      },
      {
        path : 'addCars',
        element : <AddCarStorage/>
      },
      {
        path : 'deliveries',
        element : <DeliverisPage/>
      }
    ]
  },
  {
    path : '/login',
    element : <LoginPage/>
  },
  {
    path : '/register',
    element : <RegisterPage/>
  },
  {
    path : '/userPage',
    element : <UserPage/>
  }
]);
  