import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/common/Navbar"

function App() {

 
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <main >
        <Outlet/>
      </main>
    </div>
  )
}

export default App
