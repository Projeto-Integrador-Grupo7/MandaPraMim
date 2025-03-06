import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Categoria from "../../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Produto from "../../../../models/Produto";
import Sidebar from "../../sidebar/Sidebar";
import { ToastAlerta } from "../../../../utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '', foto: "" });
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'alerta');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
      saudavel: e.target.name === 'saudavel' ? e.target.value === "true" : produto.saudavel
    });
  }

  function retornar() {
    navigate('/admin/produtos');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Produto atualizado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar o Produto!', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Produto cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar o Produto!', 'erro');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
          </h1>

          <form onSubmit={gerarNovoProduto}>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="nome" className="font-medium mb-1">Nome do Produto</label>
                <input
                  type="text"
                  placeholder="Nome do produto"
                  name="nome"
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={produto.nome || ''}
                  onChange={atualizarEstado}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="descricao" className="font-medium mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição do produto"
                  name="descricao"
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={produto.descricao || ''}
                  onChange={atualizarEstado}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="quantidade" className="font-medium mb-1">Quantidade</label>
                <input
                  type="number"
                  placeholder="Quantidade em estoque"
                  name="quantidade"
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={produto.quantidade || ''}
                  onChange={atualizarEstado}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="preco" className="font-medium mb-1">Preço</label>
                <input
                  type="number"
                  placeholder="Valor do produto"
                  name="preco"
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={produto.preco || ''}
                  onChange={atualizarEstado}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium mb-2">Saudável?</label>
                <div className="flex gap-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saudavel"
                      value="true"
                      checked={produto.saudavel === true}
                      onChange={atualizarEstado}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${produto.saudavel === true ? 'border-teal-500 bg-teal-500' : 'border-gray-300'}`}>
                      {produto.saudavel === true && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span>Sim</span>
                  </label>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saudavel"
                      value="false"
                      checked={produto.saudavel === false}
                      onChange={atualizarEstado}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${produto.saudavel === false ? 'border-teal-500 bg-teal-500' : 'border-gray-300'}`}>
                      {produto.saudavel === false && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span>Não</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="foto" className="font-medium mb-1">Foto</label>
                <input
                  type="text"
                  placeholder="URL da foto"
                  name="foto"
                  required
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={produto.foto || ''}
                  onChange={atualizarEstado}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="categoria" className="font-medium mb-1">Categoria do Produto</label>
                <select
                  name="categoria"
                  id="categoria"
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                  onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                >
                  <option value="" selected disabled>Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.descricao}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={retornar}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-teal-500 text-white rounded-lg px-6 py-2 hover:bg-teal-600 transition-colors flex items-center justify-center"
                disabled={isLoading}
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
                  <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormProduto;