import { useState } from 'react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Categoria from '../../../../models/Categoria';

type CardCategoriasAdminProps = {
  categoria: Categoria;
  hasOptions?: boolean;
  onEdit?: (categoria: Categoria) => void;
  onDelete?: (categoria: Categoria) => void;
};

function CardCategoriasAdmin({ categoria, hasOptions, onEdit, onDelete }: CardCategoriasAdminProps) {

  hasOptions = true;

  const [openOptions, setOpenOptions] = useState<number | null>(null);

  const toggleOptions = (index: number) => {
    setOpenOptions(openOptions === index ? null : index);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative bg-white border rounded-lg shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 min-w-[300px] min-h-[200px]">
        <span className="font-bold text-lg text-center">{categoria.nome}</span>
        {hasOptions && (
          <div className="relative">
            <button onClick={() => toggleOptions(0)} className="text-gray-600 focus:outline-none">
              <FiMoreHorizontal size={20} />
            </button>
            {openOptions === 0 && (
              <div className="absolute top-6 right-0 bg-white border rounded shadow-lg z-10">
                <Link to={`/admin/editarcategoria/${categoria.id}`}>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiEdit className="mr-2" /> Editar
                  </button>
                </Link>
                <Link to={`/admin/deletarcategoria/${categoria.id}`}>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiTrash2 className="mr-2" onClick={handleOpenDeleteModal} /> Deletar
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  );
};

export default CardCategoriasAdmin;