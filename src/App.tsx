import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import './App.css'
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import FormProduto from './components/produtos/formproduto/FormProduto'
import DeletarProduto from './components/produtos/deletarproduto/DeletarProduto'
import AdminLayout from './pages/adminlayout/AdminLayout'
import ListaCategoriasAdmin from './components/admin/listacategoriasadmin/ListaCategoriasAdmin'
import CadastrarCategoriaAdmin from './components/admin/cadastrarcategoriaadmin/CadastrarCategoriaAdmin'
import EditarCategoriaAdmin from './components/admin/editarcategoriaadmin/EditarCategoriaAdmin'
import DeletarCategoriaAdmin from './components/admin/deletarcategoriaadmin/DeletarCategoriaAdmin'
import Header from './components/admin/header/Header'
import ListaCategorias from './components/categorias/listacategorias/ListaCategorias'
import ListaCategoriasLoja from './components/categorias/listacategorias/ListaCategoriasLoja'

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && <Header />}

      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ListaCategorias />} />
          <Route path="/loja" element={<ListaCategoriasLoja />} />
          <Route path="/listaprodutos" element={<ListaProdutos />} />
          <Route path="/cadastrarproduto" element={<FormProduto />} />
          <Route path="/editarproduto/:id" element={<FormProduto />} />
          <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/categorias" element={<ListaCategoriasAdmin />} />
          <Route path="/admin/cadastrarcategoria" element={<CadastrarCategoriaAdmin />} />
          <Route path="/admin/editarcategoria/:id" element={<EditarCategoriaAdmin />} />
          <Route path="/admin/deletarcategoria/:id" element={<DeletarCategoriaAdmin />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App