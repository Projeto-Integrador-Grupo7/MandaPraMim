import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../../models/Categoria';
import { AuthContext } from '../../../../contexts/AuthContext';
import { buscar, deletar } from '../../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import Sidebar from '../../sidebar/Sidebar';

const DeletarCategoriaAdmin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Category deleted');
    setIsModalOpen(false);
  };

  const navigate = useNavigate()

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarcategoria() {
    setIsLoading(true)

    try {
      await deletar(`/categorias/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      alert('Categoria apagada com sucesso')

    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        alert('Erro ao deletar a categoria.')
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/admin/categorias")
  }

  return (
    <div className="flex h-screen=">
      < Sidebar />
      <div className="p-4">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Deletar Categoria
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Deletar categoria
              </h2>

              <p className="text-center text-gray-600 mb-6">
                Tem certeza que deseja deletar a categoria selecionada?
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={deletarcategoria}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center"
                >
                  {isLoading ?
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    /> :
                    <span>Deletar</span>
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletarCategoriaAdmin;