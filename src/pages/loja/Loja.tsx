import { useNavigate } from "react-router-dom";
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos";

function Loja() {
    const navigate = useNavigate();

    return (
        <div className="bg-yellow-400 min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-black mb-6">Loja</h1>
                <a href="">
                    <ListaProdutos />
                </a>
            </div>
        </div>
    );
}

export default Loja;