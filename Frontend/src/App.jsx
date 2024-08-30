import { Routes, Route } from "react-router-dom";
import usercontext from "./context/user_context";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { useState } from "react";
function App() {
const [user, setuser] = useState(false)

  return (
    <>
    <usercontext.Provider value={{user,setuser}}>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/"element={user ? <Chat /> : <Login />} />
      </Routes>
      </usercontext.Provider>
    </>
  )
}

export default App
