import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Confirmation from "../src/pages/Confirmation/Confirmation";
import Registration from "../src/pages/Registration/Registration";
import RequireAuth from "./hoc/RequireAuth"; 
import { useSelector } from "react-redux"; 

function App() {
  const auth = useSelector(state => state.auth );

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="home"
        element={auth.currentUser ? <RequireAuth><Home /></RequireAuth> : <Navigate to="/" />}
      />
      <Route path="registration" element={<Registration />} />
      <Route path="confirmation" element={<Confirmation />} />
    </Routes>
  );
}

export default App;
