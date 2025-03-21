import { Link, useNavigate } from "react-router-dom";
import CardProdutosAdmin from "../cardprodutosadmin/CardProdutosAdmin";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import Produto from "../../../../models/Produto";
import { buscar } from "../../../../services/Service";
import { Oval } from "react-loader-spinner";
import Sidebar from "../../sidebar/Sidebar";
import { ToastAlerta } from "../../../../utils/ToastAlerta";

function ListaProdutosAdmin() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'alerta')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
                < Sidebar />
                <div className="container mx-auto px-4 py-6 flex-1 p-6 overflow-y-auto">
                    <h1 className="text-4xl font-bold mb-6 ml-4">Produtos</h1>
                    <Link to="/admin/cadastrarproduto">
                        <button className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 ml-4 mb-3">
                            + Novo Produto
                        </button>
                    </Link>

                    {produtos.length === 0 && (
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
                    <div className="flex justify-center w-full my-4">
                        <div className="container flex flex-col mx-2">
                            <div className="container mx-auto my-4 
                                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {produtos.map((produto) => (
                                    <CardProdutosAdmin
                                        key={produto.id}
                                        item={produto}
                                        token={usuario.token}
                                        atualizarProdutos={buscarProdutos}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProdutosAdmin;
