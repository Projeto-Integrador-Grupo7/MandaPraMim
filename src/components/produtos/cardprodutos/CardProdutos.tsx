import { useContext } from 'react'
import { Context } from '../../../contexts/CartContext'
import  Produto  from "../../../models/Produto"

interface CardProdutosProps {
    item: Produto
}

function CardProdutos({ item }: CardProdutosProps) {
    const { adicionarProduto, removerProduto } = useContext(Context)

    return (
        <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
            <div>
                <div className="flex w-full bg-lime-600 py-2 px-4 items-center gap-4">
                    {/* Imagem do produto (se necessário) */}
                </div>
                <div className="p-4">
                    <h4 className="text-lg font-semibold uppercase">{item.nome}</h4>
                    <p>{item.descricao}</p>
                    <p>Categoria: {item.categoria?.descricao}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço: R${item.preco.toFixed(2)}</p>
                    <p>Saudável: {item.saudavel}</p>
                    <p>{item.foto}</p>
                </div>
            </div>
            <div className="flex">
                {/* Botão Adicionar ao Carrinho */}
                <button
                    className="w-full bg-blue-500 text-white py-2 hover:bg-blue-700"
                    onClick={() => adicionarProduto(item)} // Chama a função de adicionar ao carrinho
                >
                    Adicionar ao Carrinho
                </button>

                {/* Botão Remover do Carrinho */}
                <button
                    className="w-full bg-red-500 text-white py-2 hover:bg-red-700"
                    onClick={() => removerProduto(item.id)} // Chama a função de remover do carrinho
                >
                    Remover do Carrinho
                </button>
            </div>
        </div>
    )
}

export default CardProdutos
