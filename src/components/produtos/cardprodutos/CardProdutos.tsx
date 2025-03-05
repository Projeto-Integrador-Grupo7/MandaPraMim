import { useContext, useState } from 'react'
import { Context } from '../../../contexts/CartContext'
import Produto from "../../../models/Produto"
import { Link } from 'react-router-dom'
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { FaBasketShopping } from "react-icons/fa6";

interface CardProdutosProps {
    item: Produto
    hasOptions?: boolean;
}

function CardProdutos({ item, hasOptions }: CardProdutosProps) {
    const { adicionarProduto, removerProduto } = useContext(Context)

    hasOptions = true;
    
    const [openOptions, setOpenOptions] = useState<number | null>(null);
    
    const toggleOptions = (index: number) => {
        setOpenOptions(openOptions === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="relative border rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between hover:shadow-xl transition-shadow duration-300 max-w-full bg-white overflow-hidden">
                
                <Link to={`/produtodescricao/${item.id}`}>
                    <img 
                        className="w-full h-auto max-w-[220px] mx-auto border-8 border-white mt-4 cursor-pointer" 
                        src={item.foto} 
                        alt={`Foto do produto ${item.nome}`} 
                    />
                </Link>

                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex flex-col items-start justify-center px-4 py-3 z-10">
                    <h2 className="text-white text-xl font-semibold">{item.nome}</h2>      
                    <p className="text-white text-sm mt-1">Quantidade: <span className="font-semibold">{item.quantidade}</span></p>
                    <p className="text-white text-sm mt-1">Preço: <span className="font-semibold">R${item.preco.toFixed(2)}</span></p>
                </div>
                
                {hasOptions && (               
                    <div className="absolute top-3 right-3">
                        <button onClick={() => toggleOptions(0)} className="text-white focus:outline-none">
                            <FiMoreHorizontal size={20} />
                        </button>
                        {openOptions === 0 && (
                            <div className="absolute top-6 right-0 bg-white border rounded-lg shadow-lg z-10 p-2 w-48">
                                {/* Botão Adicionar ao Carrinho */}
                                <button
                                    className="w-full bg-blue-500 text-white py-2 mb-2 hover:bg-blue-700 transition-colors rounded-md"
                                    onClick={() => adicionarProduto(item)} // Chama a função de adicionar ao carrinho
                                >
                                    <FaBasketShopping className="mr-2 inline" />
                                    Adicionar ao Carrinho
                                </button>
                                {/* Botão Remover do Carrinho */}
                                <button
                                    className="w-full bg-red-500 text-white py-2 hover:bg-red-700 transition-colors rounded-md"
                                    onClick={() => removerProduto(item.id)} // Chama a função de remover do carrinho
                                >
                                    <FiTrash2 className="mr-2 inline" />
                                    Remover do Carrinho
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardProdutos
