import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Confirmation from "../src/pages/Confirmation/Confirmation";
import Registration from "../src/pages/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/reducers/auth";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth )

  useEffect(()=>{
      dispatch(getCurrentUser());
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="home"  element={<Home/>}/>
      <Route path="registration"  element={<Registration/>}/>
      <Route path="confirmation" element={<Confirmation/>}/>     
    </Routes>
  );
}

export default App;
