import { useState } from "react";
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos";
import ListaCategoriasLoja from "../../components/categorias/listacategorias/ListaCategoriasLoja";

function Loja() {
    const [categoriaAtiva, setCategoriaAtiva] = useState(0);

    return (
        <div className="bg-[#f5c840ff] min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <ListaCategoriasLoja setCategoriaAtiva={setCategoriaAtiva} categoriaAtiva={categoriaAtiva} />
                <ListaProdutos categoriaId={categoriaAtiva} />
            </div>
        </div>
    );
}

export default Loja;