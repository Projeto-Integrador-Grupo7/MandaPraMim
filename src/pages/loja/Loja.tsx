import { useEffect, useState } from "react";
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos";
import ListaCategoriasLoja from "../../components/categorias/listacategorias/ListaCategoriasLoja";

function Loja() {
    const [categoriaAtiva, setCategoriaAtiva] = useState(0);
    const categoriaParam = new URLSearchParams(window.location.search).get('categoria');

    useEffect(() => {
        if (categoriaParam) {
            setCategoriaAtiva(parseInt(categoriaParam));
            // Scroll suave para a seção de produtos após um breve delay
            setTimeout(() => {
                document.getElementById('produtos-section')?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        }
    }, [categoriaParam]);

    return (
        <div className="bg-[#f5c840ff] min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <ListaCategoriasLoja setCategoriaAtiva={setCategoriaAtiva} categoriaAtiva={categoriaAtiva} />
                <div id="produtos-section">
                    <ListaProdutos categoriaId={categoriaAtiva} />
                </div>
            </div>
        </div>
    );
}

export default Loja;