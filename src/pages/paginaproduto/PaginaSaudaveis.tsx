import ListaSaudaveis from "../../components/produtos/listaprodutos/ListaSaudaveis";

function Loja() {

    return (
        <div className="bg-[#f5c840ff] min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-black mb-6">Produtos Saudáveis</h1>

                <ListaSaudaveis />

            </div>
        </div>
    );
}

export default Loja;