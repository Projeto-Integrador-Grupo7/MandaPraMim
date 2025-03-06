import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Categoria from "../../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Produto from "../../../../models/Produto";
import Sidebar from "../../sidebar/Sidebar";

function FormProduto() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '', foto: "" })
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
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

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
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
      alert('Você precisa estar logado!');
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    buscarCategorias()

    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [id])

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    })
  }, [categoria])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
      saudavel: e.target.value === "true"
    });
  }

  function retornar() {
    navigate('/admin/produtos');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        alert('Produto atualizado com sucesso!')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout()
        } else {
          alert('Erro ao atualizar o Produto!')
        }
      }

    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        })

        alert('Produto cadastrado com sucesso!');

      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout()
        } else {
          alert('Erro ao cadastrar o Produto!');
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="flex h-screen">
      < Sidebar />
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">
          {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>

        <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Produto</label>
            <input
              type="text"
              placeholder="Nome do produto"
              name="nome"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Descrição</label>
            <input
              type="text"
              placeholder="Descrição do produto"
              name="descricao"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={produto.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Quantidade</label>
            <input
              type="number"
              placeholder="Quantidade em estoque"
              name="quantidade"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={produto.quantidade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Preço</label>
            <input
              type="number"
              placeholder="Valor do produto"
              name="preco"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Saudável?</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="saudavel"
                  value="true"
                  checked={produto.saudavel === true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="mr-2"
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="saudavel"
                  value="false"
                  checked={produto.saudavel === false}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="mr-2"
                />
                Não
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              placeholder="Foto"
              name="foto"
              required
              className="border-2 border-slate-700 rounded p-2"
              value={produto.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Categoria do Produto</p>
            <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded'
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>Selecione uma categoria</option>

              {categorias.map((categoria) => (
                <>
                  <option value={categoria.id} >{categoria.descricao}</option>
                </>
              ))}

            </select>
          </div>
          <button
            type='submit'
            className='rounded disabled:bg-slate-200 bg-lime-600 hover:bg-gray-600 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
            disabled={carregandoCategoria}
          >
            {isLoading ?
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
              <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;