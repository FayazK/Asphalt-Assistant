import './App.css';
import UploadFile from './component/Uploadfile'
import AssistantCards from './component/AssistantsCards';
import ChatWindow from './component/ChatWindow';
import Error from './component/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <AssistantCards />,
  },
  {
    path: "upload",
    element: <UploadFile/>,
  },
  {
    path: "chat/:assist_id",
    element: <ChatWindow/>, 
  },
  {
    path: "*",
    element: <Error/>, 
  },
]);

function App() {
  return (
    <div className="App" >
      {/* <ChatWindow/> */}
      {/* <UploadFile/> */}
      {/* <AssistantCards /> */}
      <RouterProvider router={router} />
      <Outlet />
      {/* <ClickableComponent/> */}
    </div>
  );
}

export default App;