import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Produto from "../../models/Produto";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { Context } from "../../contexts/CartContext";

export default function PaginaProduto() {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const { usuario } = useContext(AuthContext);
  const { adicionarProduto } = useContext(Context);
  const token = usuario?.token;
  const navigate = useNavigate();

  const precoEmReais = produto?.preco; // Este é o valor decimal
  const precoFormatado = precoEmReais?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Verificar se o token está presente e redirecionar caso contrário
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token && id) {
      buscar(`/produtos/${id}`, setProduto, { headers: { Authorization: token } }).catch((error) => {
        if (error.toString().includes('403')) {
          alert("Sessão expirada. Faça login novamente.");
        }
      });
    }
  }, [id, token]);

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  if (!produto) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Lado esquerdo - Imagem do produto */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <img
              src={produto.foto}
              alt={produto.nome}
              className="max-h-96 object-contain"
            />
          </div>

          {/* Lado direito - Informações do produto */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800">{produto.nome}</h1>
            <p className="text-xl font-semibold text-gray-700 mt-2">
              {produto.preco > 0 ? precoFormatado : 'Grátis'}
            </p>

            <div className="mt-6">
              {/* <div className="flex items-center mb-4">
                <div className="border border-gray-300 flex items-center rounded-md">
                  <button
                    onClick={diminuirQuantidade}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantidade}</span>
                  <button
                    onClick={aumentarQuantidade}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div> */}

              <button
                onClick={() => adicionarProduto(produto)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
              >
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Descrição do Produto</h2>
              <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>

              <div className="mt-6 space-y-2">
                <div className="flex">
                  <span className="font-medium w-24">Categoria:</span>
                  <span className="text-gray-600">{produto.categoria?.nome || "Não categorizado"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}