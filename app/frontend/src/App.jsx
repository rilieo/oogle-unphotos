/* Routing guided by https://hygraph.com/blog/routing-in-react */
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Photos from "./pages/Photos";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col p-3 h-screen font-inter">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/photos" element={user ? <Photos /> : <Navigate to="/login"/>}></Route>
        <Route path="/login" element={user ? <Navigate to="/photos" /> : <Login />}></Route>
        <Route path="/signup" element={user ? <Navigate to="/photos"/> : <Signup />}></Route>
        {/* <Route path="/album" element={user ? <Album /> : <Navigate to="/login" />}></Route> */}
      </Routes>
    </div>
  )
}

export default App
