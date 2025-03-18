import { Link, useNavigate } from "react-router-dom";
import CardCategoriasAdmin from "../cardcategoriasadmin/CardCategoriasAdmin"
import Sidebar from "../../sidebar/Sidebar"
import { useContext, useEffect, useState } from "react";
import Categoria from "../../../../models/Categoria";
import { AuthContext } from "../../../../contexts/AuthContext";
import { buscar } from "../../../../services/Service";
import { Oval } from "react-loader-spinner";
import { ToastAlerta } from "../../../../utils/ToastAlerta";

function ListaCategoriasAdmin() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'alerta');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              Categorias
            </h1>
            <Link to="/admin/cadastrarcategoria">
              <button className="w-full sm:w-auto bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition-colors">
                + Nova Categoria
              </button>
            </Link>
          </div>

          {categorias.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#008361"
                ariaLabel="oval-loading"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorias.map((categoria) => (
                <CardCategoriasAdmin
                  key={categoria.id}
                  categoria={categoria}
                  token={usuario.token}
                  atualizarCategorias={buscarCategorias}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ListaCategoriasAdmin;