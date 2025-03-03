import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
// import Footer from './components/footer/Footer'
// import Navbar from './components/navbar/Navbar'
// import Home from './pages/home/Home'
import './App.css'
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import FormProduto from './components/produtos/formproduto/FormProduto'
import DeletarProduto from './components/produtos/deletarproduto/DeletarProduto'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <Navbar /> */}
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/listaprodutos" element={<ListaProdutos />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
          </div>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App