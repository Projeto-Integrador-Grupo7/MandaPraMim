import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Sobre from "./pages/sobre/Sobre"
import Home from "./pages/home/Home"


function App() {
  return (
    <>
      <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="top-0 items-center  min-h-screen ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />}/>
              <Route path="/sobre" element={<Sobre />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App