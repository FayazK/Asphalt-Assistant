import './App.css';
import UploadFile from './component/Uploadfile'
import AssistantCards from './component/AssistantsCards';
import ChatWindow from './component/ChatWindow';
import ClickableComponent from './component/Test'
import {useState} from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AssistantCards />
  },,
]);

function App() {
  const [display, setDisplay] = useState(false)
  const instructions = (
    <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
      Welcome! I am an assistant here to help you with the asphalt mixturet experiments records.
    </p>
  );
  return (
    <div className="App" >
      {/* <ChatWindow/> */}
      {/* <UploadFile/> */}

      <RouterProvider router={router} />
      {/* <ClickableComponent/> */}
    </div>
  );
}

export default App;
