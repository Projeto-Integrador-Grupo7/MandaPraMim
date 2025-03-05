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
      <div className="relative border rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300 max-w-full">
          <img
          className="w-full h-full object-cover opacity-400"
          src={categoria.foto}
          alt="Comidas Saudáveis"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex items-end justify-center pb-3">
          <h2 className="text-white text-xl font-bold">
            {categoria.nome}
          </h2>
        </div>

        {hasOptions && (
          <div className="absolute top-3 right-3">
            <button onClick={() => toggleOptions(0)} className="text-white focus:outline-none">
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
    </div>
  );
};

export default CardCategoriasAdmin;