import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Confirmation from "../src/pages/Confirmation/Confirmation";
import Registration from "../src/pages/Registration/Registration";

function App() {

  return (
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="registration"  element={<Registration/>}/>
      <Route path="confirmation" element={<Confirmation/>}/>     
    </Routes>
  );
}

export default App;
