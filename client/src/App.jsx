import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NavBar from './components/navigation/NavBar'
import RiderDashboard from './components/RiderDashboard'
import ClientDashbard from './components/ClientDashbard'
import RegisterPage from './components/RegisterPage'

export default function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={ <RegisterPage/>} />
        <Route path="rider" element={<RiderDashboard />} />
        <Route path="client" element={<ClientDashbard />} />

      </Routes>
    </div>
  )
}
