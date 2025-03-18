import { useNavigate } from "react-router-dom";
import CardCategorias from "../cardcategorias/CardCategorias"
import { useContext, useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA, Oval } from "react-loader-spinner";

function ListaCategorias() {
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
      <div className="flex flex-col items-center min-h-screen bg-yellow-500">
        <div className="container flex flex-col mt-10 justify-center items-center">
          {categorias.length === 0 && (
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#008361"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="flex justify-center items-center min-h-screen mx-150"
            />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {categorias.map((categoria) => (
              <CardCategorias key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaCategorias