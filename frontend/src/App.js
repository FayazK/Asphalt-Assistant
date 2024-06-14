import './App.css';
import UploadFile from './component/Uploadfile'
import AssistantCards from './component/AssistantsCards';
import ChatWindow from './component/ChatWindow';
import {useState} from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <AssistantCards />,
    children: [
      {
        path: 'upload',
        element: <UploadFile />
      },
      {
        path: 'chat',
        element: <ChatWindow />
        
      }
    ]
  }
]);

function App() {
  return (
    <div className="App" >
      {/* <ChatWindow/> */}
      {/* <UploadFile/> */}
      <AssistantCards />
      {/* <RouterProvider router={router} /> */}
      {/* <ClickableComponent/> */}
    </div>
  );
}

export default App;