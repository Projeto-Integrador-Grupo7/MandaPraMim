
import Categoria from "../../../models/Categoria"
import { useNavigate } from "react-router-dom";

interface CardCategoriasProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  const navigate = useNavigate();

  // Função para navegar para a loja com o ID da categoria
  const navegarParaLoja = () => {
    navigate(`/loja?categoria=${categoria.id}`);
  };

  return (
    <>
      <div
        className="relative w-[450px] h-[250px] rounded-lg overflow-hidden shadow-lg cursor-pointer mb-7"
        onClick={navegarParaLoja}
      >
        <img
          className="w-full h-full object-cover opacity-400"
          src={categoria.foto}
          alt={categoria.nome}
        />

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex items-end justify-center pb-3 hover:bg-gray-50 hover:opacity-25 transition duration-500">
          <h2 className="text-white text-xl font-bold">
            {categoria.nome}
          </h2>
        </div>
      </div>
    </>
  )
}

export default CardCategorias