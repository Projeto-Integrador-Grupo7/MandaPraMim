import { Link, useNavigate } from "react-router-dom";
import CardCategoriasAdmin from "../cardcategoriasadmin/CardCategoriasAdmin"
import Sidebar from "../../sidebar/Sidebar"
import { useContext, useEffect, useState } from "react";
import Categoria from "../../../../models/Categoria";
import { AuthContext } from "../../../../contexts/AuthContext";
import { buscar } from "../../../../services/Service";
import { Oval } from "react-loader-spinner";

function ListaCategoriasAdmin() {

  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarCategorias() {
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
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarCategorias()
  }, [categorias.length])

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        < Sidebar />

        <div className="container mx-auto px-4 py-6 flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 ml-4">Categorias</h1>
          <Link to="/admin/cadastrarcategoria">
            <button className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 ml-4 mb-3">
              + Nova Categoria
            </button>
          </Link>
          {categorias.length === 0 && (
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#008361"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="flex justify-center items-center min-h-screen"
            />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {categorias.map((categoria) => (
              <CardCategoriasAdmin
                key={categoria.id}
                categoria={categoria}
                token={usuario.token}
                atualizarCategorias={buscarCategorias}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaCategoriasAdmin