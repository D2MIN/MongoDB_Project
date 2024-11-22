import {createBrowserRouter} from "react-router-dom";
import Home from "./App/Home/UI/Home.tsx";
import CreateStore from "./App/CreateStorage/UI/CreateStorage.tsx";
import StorageInfo from "./App/StorageInfo/UI/StorageInfo.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/createStorage',
    element: <CreateStore/>,
  },
  {
    path: '/storageInfo/:id',
    element: <StorageInfo/>
  }
]);
  