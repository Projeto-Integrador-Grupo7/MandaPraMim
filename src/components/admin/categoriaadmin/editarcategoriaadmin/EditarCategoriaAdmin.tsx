import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Camera, Image } from 'lucide-react';
import Sidebar from '../../sidebar/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../../models/Categoria';
import { AuthContext } from '../../../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

const EditarCategoriaAdmin: React.FC = () => {
  const [categoryName, setCategoryName] = useState('Bebidas');
  const [selectedProduct, setSelectedProduct] = useState('Cachaça');
  const [image, setImage] = useState<string | null>('https://via.placeholder.com/150');

  const handleImageChange = () => {
    // Implement image upload logic
    alert('Image upload functionality to be implemented');
  };

  const handleAddProduct = () => {
    // Implement add product logic
    alert('Add product functionality to be implemented');
  };

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/admin/categorias")
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { 'Authorization': token }
        })
        alert('A Categoria foi atualizada com sucesso!')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          alert('Erro ao atualizar a categoria.')
        }

      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { 'Authorization': token }
        })
        alert('A Categoria foi cadastrada com sucesso!')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          alert('Erro ao cadastrar o tema.')
        }

      }
    }

    setIsLoading(false)
    retornar()
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Categoria</h1>

          <div className="flex items-center mb-6">
            {image ? (
              <img
                src={image}
                alt="Categoria"
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                <Image className="text-gray-500" />
              </div>
            )}
            <button
              onClick={handleImageChange}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center"
            >
              <Camera className="mr-2 w-5 h-5" />
              Alterar imagem
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">Nome</label>
            <input
              type="text"
              name="nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Produtos</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {/* 
          <button
            onClick={handleAddProduct}
            className="mb-4 text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-md flex items-center"
          >
            <span className="mr-2 font-bold">+</span>
            Atribuir produtos
          </button> */}

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={retornar}
            >
              Cancelar
            </button>
            <form onSubmit={gerarNovaCategoria}>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                {isLoading ?
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                  <span>Atualizar</span>

                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCategoriaAdmin;