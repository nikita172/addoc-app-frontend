import Login from "./pages/login/Login";
import Register from './pages/register/Register';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import AddDocForm from "./pages/addDocForm/AddDocForm";
const Layout=()=>{
  return (
    <div className="app">
      <Outlet />
    </div>
  )
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/register",
        element:<Register />
      },
      {
        path:"/document/add",
        element:<AddDocForm />

      }

    ]
  },
]
);
function App() {
  return (
    <div>
      <RouterProvider router={router} />     
    </div>
  );
}

export default App;
