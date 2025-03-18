import { LayoutGrid, ShoppingCart, Tag, Undo2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Menu Botão Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          lg:hidden fixed top-4 left-4 z-50 p-2 
          ${isOpen ? 'bg-yellow-600' : 'bg-yellow-500'} 
          rounded-lg transition-colors duration-200
          hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600
        `}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
        fixed lg:sticky lg:top-0
        w-64 min-h-screen 
        bg-yellow-500 
        transition-transform duration-300 ease-in-out
        z-40
        flex flex-col
        shadow-lg
      `}>
        <nav className="flex flex-col p-4 flex-grow space-y-2">
          <Link
            to="/admin"
            className={`
              flex items-center text-gray-800 p-3 rounded-lg transition-colors
              ${isActiveRoute('/admin') ? 'bg-yellow-600 text-white' : 'hover:bg-yellow-600 hover:text-white'}
            `}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-3 font-medium">Pedidos</span>
          </Link>
          <Link
            to="/admin/produtos"
            className={`
              flex items-center text-gray-800 p-3 rounded-lg transition-colors
              ${isActiveRoute('/admin/produtos') ? 'bg-yellow-600 text-white' : 'hover:bg-yellow-600 hover:text-white'}
            `}
            onClick={() => setIsOpen(false)}
          >
            <Tag className="w-5 h-5" />
            <span className="ml-3 font-medium">Produtos</span>
          </Link>
          <Link
            to="/admin/categorias"
            className={`
              flex items-center text-gray-800 p-3 rounded-lg transition-colors
              ${isActiveRoute('/admin/categorias') ? 'bg-yellow-600 text-white' : 'hover:bg-yellow-600 hover:text-white'}
            `}
            onClick={() => setIsOpen(false)}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="ml-3 font-medium">Categorias</span>
          </Link>
          <Link
            to="/home"
            className={`
              flex items-center text-gray-800 p-3 rounded-lg transition-colors
              ${isActiveRoute('/home') ? 'bg-yellow-600 text-white' : 'hover:bg-yellow-600 hover:text-white'}
            `}
            onClick={() => setIsOpen(false)}
          >
            <Undo2 className="w-5 h-5" />
            <span className="ml-3 font-medium">Voltar para Loja</span>
          </Link>
        </nav>
        <footer className="p-4 text-center text-gray-800 border-t border-yellow-600">
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