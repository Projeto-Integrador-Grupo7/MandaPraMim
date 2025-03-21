import { ChangeEvent, useContext, useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Categoria from "../../../../models/Categoria";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../../utils/ToastAlerta";

function FormCategoria() {

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
      ToastAlerta('Você precisa estar logado!', 'alerta')
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

    const categoriaParaEnvio = {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      foto: categoria.foto
      // sem o campo produto
    };

    console.log("Categoria antes do envio:", categoriaParaEnvio);

    if (id !== undefined) {
      try {
        console.log("Categoria enviada para atualização:", categoriaParaEnvio);
        await atualizar(`/categorias`, categoriaParaEnvio, setCategoria, {
          headers: { 'Authorization': token }
        })
        ToastAlerta('A Categoria foi atualizado com sucesso!', 'sucesso')
      } catch (error: any) {
        console.error("Erro ao atualizar a categoria:", error);
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar a categoria.', 'erro')
        }

      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { 'Authorization': token }
        })
        ToastAlerta('A Categoria foi cadastrado com sucesso!','sucesso')
      } catch (error: any) {
        console.error("Erro ao cadastrar a categoria:", error);
        console.error("Detalhes do erro:", error.response?.data);
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar a Categoria.','erro')
        }

      }
    }

    setIsLoading(false)
    retornar()
  }



  return (
    <>
      <div className="flex h-screen">
        < Sidebar />
        <div className="p-6 bg-white rounded-lg max-w-md mx-auto w-full">
          <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-center mt-15">
              {id === undefined ? "Adicionar Categoria" : "Editar Categoria"}
            </h1>
            <div className="flex flex-col mb-4">
              <label htmlFor="nome" className="mb-2">Título</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                name="nome"
                placeholder="adicione um título"
                value={categoria.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="descricao" className="mb-2">Descrição</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                name="descricao"
                placeholder="adicione uma descrição"
                value={categoria.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="foto" className="mb-2">Link da Imagem</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                name="foto"
                placeholder="adicione um link"
                value={categoria.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={retornar} className="border border-gray-300 rounded-lg px-4 py-2">
                Cancelar
              </button>

              <form onSubmit={gerarNovaCategoria}>
                <button
                  type="submit"
                  className="bg-teal-500 text-white rounded-lg px-4 py-2 flex justify-center"
                >
                  {isLoading ?
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    /> :
                    <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormCategoria