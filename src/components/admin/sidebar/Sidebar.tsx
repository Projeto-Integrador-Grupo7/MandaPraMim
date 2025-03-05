import { LayoutGrid, ShoppingCart, Tag, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <div className="flex flex-col w-60 bg-yellow-500 h-screen">
        <nav className="flex flex-col p-2 flex-grow">
          <Link to="/admin" className="flex items-center text-gray-700 p-2 hover:bg-gray-200">
            <ShoppingCart className="w-5 h-5 ml-2" />
            <span className="ml-2">Pedidos</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center text-gray-700 p-2 hover:bg-gray-200">
            <Tag className="w-5 h-5 ml-2" />
            <span className="ml-2">Produtos</span>
          </ Link>
          <Link to="/admin/categorias" className="flex items-center text-gray-700 p-2 hover:bg-gray-200">
            <LayoutGrid className="w-5 h-5 ml-2" />
            <span className="ml-2">Categorias</span>
          </Link>
          <Link to="/home" className="flex items-center text-gray-700 p-2 hover:bg-gray-200">
            <Undo2 className="w-5 h-5 ml-2" />
            <span className="ml-2">Voltar para Loja</span>
          </Link>
        </nav>
        <footer className="p-4 text-center text-gray-600 mb-15 ">
          Feliz de ter você como nosso colaborador!
        </footer>
      </div>
    </>
  )
}

export default Sidebar