import { useNavigate } from "react-router-dom";
import CardCategoriasLoja from "../cardcategorias/CardCategoriasLoja"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaCategoriasLoja() {

  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarTemas() {
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
    buscarTemas()
  }, [categorias.length])

  return (
    <>
      <div className="bg-[#f5c840ff] p-8">
        <h2 className="text-4xl font-bold text-center mb-6">Categorias</h2>
        <div className="flex justify-center space-x-8">
          {categorias.length === 0 && (
            <DNA
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper mx-auto"
            />
          )}
          {categorias.map((categoria) => (
            <CardCategoriasLoja key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ListaCategoriasLoja