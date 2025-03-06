import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Produto from "../../models/Produto";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";

export default function PaginaProduto() {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const { usuario } = useContext(AuthContext);
  const token = usuario?.token;
  const navigate = useNavigate();

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

  if (!produto) return <p>Loading...</p>;

  return (
    <div className="flex gap-8 p-8 ">
      <img src={produto.foto} alt={produto.nome} className="w-1/3 rounded-lg" />
      <div>
        <h1 className="text-3xl font-bold">{produto.nome}</h1>
        <p className="text-lg text-gray-600">${produto.preco.toFixed(2)}</p>
        <p className="mt-4">{produto.descricao}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Add to bag</button>
      </div>
    </div>
  );
}
