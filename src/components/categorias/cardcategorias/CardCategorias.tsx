import Categoria from "../../../models/Categoria"

interface CardCategoriasProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  return (
    <>
      <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg">
        <img
          className="w-full h-full object-cover opacity-400"
          src={categoria.foto}
          alt={categoria.nome}
        />

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex items-end justify-center pb-3">
          <h2 className="text-white text-xl font-bold">
            {categoria.nome}
          </h2>
        </div>
      </div>
    </>
  )
}

export default CardCategorias