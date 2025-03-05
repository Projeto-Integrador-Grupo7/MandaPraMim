import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import './App.css'
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'

import AdminLayout from './pages/adminlayout/AdminLayout'
import ListaCategoriasAdmin from './components/admin/categoriaadmin/listacategoriasadmin/ListaCategoriasAdmin'
import Header from './components/admin/header/Header'
import { Provider } from './contexts/CartContext'
import FormProduto from './components/admin/produtoadmin/formprodutoadmin/FormProduto'
import DeletarProduto from './components/admin/produtoadmin/deletarprodutoadmin/DeletarProduto'
import ListaProdutosAdmin from './components/admin/produtoadmin/listaprodutosadmin/ListaProdutosAdmin'
import PaginaProduto from './pages/paginaproduto/PaginaProduto'
import Loja from './pages/loja/Loja'
import ListaCategoriasLoja from './components/categorias/listacategorias/ListaCategoriasLoja'
import Perfil from './pages/perfil/Perfil'
import FormCategoria from './components/admin/categoriaadmin/formcategoria/FormCategoria'

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
          <Route path="/loja" element={<Loja />} />
          <Route path="/listaprodutos" element={<ListaProdutos />} />
          <Route path="/produtodescricao/:id" element={<PaginaProduto />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin/categorias" element={<ListaCategoriasAdmin />} />
          <Route path="/admin/cadastrarcategoria" element={<FormCategoria />} />
          <Route path="/admin/editarcategoria/:id" element={<FormCategoria />} />
          <Route path="/admin/produtos" element={<ListaProdutosAdmin />} />
          <Route path="/admin/cadastrarproduto" element={<FormProduto />} />
          <Route path="/admin/editarproduto/:id" element={<FormProduto />} />
          <Route path="/admin/deletarproduto/:id" element={<DeletarProduto />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}


export default App