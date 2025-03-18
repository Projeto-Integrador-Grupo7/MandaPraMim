import { LayoutGrid, ShoppingCart, Tag, Undo2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-yellow-500 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
        fixed lg:relative
        w-60 h-screen 
        bg-yellow-500 
        transition-transform duration-300 ease-in-out
        z-40
        overflow-y-auto
      `}>
        <nav className="flex flex-col p-2 flex-grow">
          <Link
            to="/admin"
            className="flex items-center text-gray-700 p-3 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-3">Pedidos</span>
          </Link>
          <Link
            to="/admin/produtos"
            className="flex items-center text-gray-700 p-3 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Tag className="w-5 h-5" />
            <span className="ml-3">Produtos</span>
          </Link>
          <Link
            to="/admin/categorias"
            className="flex items-center text-gray-700 p-3 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="ml-3">Categorias</span>
          </Link>
          <Link
            to="/home"
            className="flex items-center text-gray-700 p-3 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Undo2 className="w-5 h-5" />
            <span className="ml-3">Voltar para Loja</span>
          </Link>
        </nav>
        <footer className="p-4 text-center text-gray-600 mb-15">
          Feliz de ter você como nosso colaborador!
        </footer>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;