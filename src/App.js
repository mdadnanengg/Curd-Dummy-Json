import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="create-user" element={<CreateUser/>}/>
        <Route path="users/:id" element={<ViewUser/>}/>
        <Route path="edit/:id" element={<EditUser/>}/>

      </Routes>
    </div>
  );
}

export default App;
