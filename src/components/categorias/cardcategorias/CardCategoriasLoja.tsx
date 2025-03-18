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
        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto relative">
          <img
            src={categoria.foto}
            alt={categoria.nome}
            className={`w-full h-full rounded-full object-cover 
              ${isActive ? 'border-4 border-orange-500' : 'border-2 border-transparent'}
              transition-all duration-300 ease-in-out
            `}
          />
          {isActive && (
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                w-3 h-3 bg-orange-500 rotate-45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
        <p className={`text-sm md:text-lg font-semibold mt-2 
          ${isActive ? 'text-orange-500' : 'text-black'}
          transition-colors duration-300
        `}>
          {categoria.nome}
        </p>
      </motion.div>
    </div>
  );
}

export default CardCategoriasLoja;