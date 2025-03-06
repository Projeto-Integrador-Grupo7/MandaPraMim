import Categoria from "../../../models/Categoria";
import { motion } from "framer-motion";

interface CardCategoriasProps {
  categoria: Categoria;
  isActive: boolean;
}

function CardCategoriasLoja({ categoria, isActive }: CardCategoriasProps) {
  return (
    <div className="text-center cursor-pointer relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={categoria.foto}
          alt={categoria.nome}
          className={`w-40 h-40 rounded-full object-cover ${isActive ? 'border-4 border-orange-500' : 'border-2 border-transparent'}`}
        />
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <p className={`text-lg font-semibold mt-2 ${isActive ? 'text-orange-500' : 'text-black'}`}>
          {categoria.nome}
        </p>
      </motion.div>
    </div>
  );
}

export default CardCategoriasLoja;