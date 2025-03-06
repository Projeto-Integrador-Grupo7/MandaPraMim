import { useNavigate, useSearchParams } from "react-router-dom";
import CardCategoriasLoja from "../cardcategorias/CardCategoriasLoja";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import LogoMandaPraMim from "../../../assets/img/homeimg/LogoMandaPraMim.png"
import { buscar } from "../../../services/Service";
import { motion } from "framer-motion";

function ListaCategoriasLoja({ setCategoriaAtiva, categoriaAtiva }) {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const selecionarCategoria = (id) => {
    setCategoriaAtiva(id);
    navigate(`/loja?categoria=${id}`, { replace: true });
  };

  async function buscarCategorias() {
    setIsLoading(true);
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token }
      });
      setIsLoading(false);
    } catch (error) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  // Adicionar categoria "Todos" ao início da lista
  const todasCategorias = [{ id: 0, nome: "Todos", descricao: "Todas as categorias", foto: LogoMandaPraMim }, ...categorias];

  return (
    <div className="bg-[#f5c840ff] p-8">
      <h2 className="text-4xl font-bold text-center mb-6">Categorias</h2>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      ) : (
        <motion.div
          className="flex justify-center space-x-8 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {todasCategorias.map((categoria) => (
            <motion.div
              key={categoria.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategoriaAtiva(categoria.id)}
            >
              <CardCategoriasLoja
                categoria={categoria}
                isActive={categoriaAtiva === categoria.id}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default ListaCategoriasLoja;