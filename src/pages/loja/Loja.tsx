import { useNavigate } from "react-router-dom";
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos";
import ListaCategoriasLoja from "../../components/categorias/listacategorias/ListaCategoriasLoja";

function Loja() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f5c840ff] min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-black mb-6">Loja</h1>
                <ListaCategoriasLoja />
                <ListaProdutos />

            </div>
        </div>
    );
}

export default Loja;