import Categoria from "../../../models/Categoria"

interface CardCategoriasProps {
  categoria: Categoria
}

function CardCategoriasLoja({ categoria }: CardCategoriasProps) {
  return (
    <>
      <div className="text-center">
        <img
          src={categoria.foto}
          alt="Comidas Saudáveis"
          className="w-40 h-40 rounded-full object-cover"
        />
        <p className="text-lg font-semibold">{categoria.nome}</p>
      </div>
    </>
  )
}

export default CardCategoriasLoja