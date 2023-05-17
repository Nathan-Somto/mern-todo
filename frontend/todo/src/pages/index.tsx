import { Route, Routes } from "react-router-dom"
import Loader from "./Loader"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Notfound from "./Notfound"

function Pages() {
  return (
    <Routes>
        <Route path='/' element={<Loader/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='signup' element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/:firstname/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Notfound/>}/>
    </Routes>
  )
}

export default Pages