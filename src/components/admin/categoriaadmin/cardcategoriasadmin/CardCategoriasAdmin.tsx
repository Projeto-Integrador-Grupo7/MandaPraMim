import { useState } from 'react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Categoria from '../../../models/Categoria';
import { deletar } from '../../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

type CardCategoriasAdminProps = {
  categoria: Categoria;
  hasOptions?: boolean;
  token: string;
  atualizarCategorias: () => void;
};

function CardCategoriasAdmin({
  categoria,
  token,
  atualizarCategorias
}: CardCategoriasAdminProps) {
  const [openOptions, setOpenOptions] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOptions = (index: number) => {
    setOpenOptions(openOptions === index ? null : index);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deletarCategoria = async () => {
    setIsLoading(true);
    try {
      await deletar(`/categorias/${categoria.id}`, {
        headers: {
          'Authorization': token
        }
      });

      alert('Categoria deletada com sucesso');
      atualizarCategorias(); // Atualiza a lista de categorias após a deleção
    } catch (error: any) {
      console.error('Erro ao deletar categoria:', error);

      // Tratamento de erro mais detalhado
      if (error.response) {
        // O servidor respondeu com um status de erro
        alert(`Erro ao deletar a categoria: ${error.response.data.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        alert('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        // Algo aconteceu ao configurar a requisição
        alert('Erro ao processar a solicitação de deleção.');
      }
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative border rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow duration-300 max-w-full">
        <img
          className="w-full h-full object-cover opacity-400"
          src={categoria.foto}
          alt={categoria.nome}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">
            {categoria.nome}
          </h2>
        </div>

        <div className="absolute top-3 right-3">
          <button
            onClick={() => toggleOptions(0)}
            className="text-white focus:outline-none"
          >
            <FiMoreHorizontal size={20} />
          </button>

          {openOptions === 0 && (
            <div className="absolute top-6 right-0 bg-white border rounded shadow-lg z-10">
              <Link to={`/admin/editarcategoria/${categoria.id}`}>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FiEdit className="mr-2" /> Editar
                </button>
              </Link>

              <button
                onClick={handleOpenDeleteModal}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FiTrash2 className="mr-2" /> Deletar
              </button>
            </div>
          )}
        </div>

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Confirmar Exclusão
              </h2>

              <p className="text-center text-gray-600 mb-6">
                Tem certeza que deseja deletar a categoria "{categoria.nome}"?
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCloseDeleteModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={deletarCategoria}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                >
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  ) : (
                    <>
                      <FiTrash2 className="mr-2" /> Deletar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardCategoriasAdmin;