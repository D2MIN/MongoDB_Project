import {createBrowserRouter} from "react-router-dom";
import Home from "./App/Home/UI/Home.tsx";
import CreateStore from "./App/CreateStorage/UI/CreateStorage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/createStorage',
    element : <CreateStore/>,
  }
]);
  