import { useState, useEffect } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Police from "./pages/Police"
import Criminals from "./pages/Criminals"
import CriminalDetail from "./pages/CriminalDetail"
import Editing from "./pages/Editing"
import Department from "./pages/Department"
import Auth from "./pages/Auth"
import CrimeCategory from "./pages/CrimeCategory"
import AddCriminalDetails from "./pages/AddCriminalDetails"
import NotFound from "./pages/NotFound"
import Header from './components/Header'
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase"
import { signOut } from 'firebase/auth'

function App() {
  const [active, setActive] = useState("home")
  const [user, setUser] = useState(null);

  const navigater = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      }
      else {
        setUser(null);
      }
    }
    )
  })

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login")
      navigater("/auth");
    })
  }

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home setActive={setActive} user={user}/>} />
        <Route path='/department' element={<Department />} />
        <Route path='/police' element={<Police />} />
        <Route path='/Criminals' element={<Criminals setActive={setActive} user={user}/>} />
        {/* <Route path='/create' element={<Editing />} /> */}
        <Route path='/AddCriminalDetails' element={user?.uid ? <AddCriminalDetails user={user} /> : <Navigate to="/" />} />
        <Route path='/Category' element={<CrimeCategory />} />
        <Route path='/auth' element={<Auth setActive={setActive} />} />

        <Route path='/CriminalDetail/:id' element={<CriminalDetail setActive={setActive} />} />
        <Route path='/update:id' element={user?.uid ? <Editing user={user} /> : <Navigate to="/" />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
