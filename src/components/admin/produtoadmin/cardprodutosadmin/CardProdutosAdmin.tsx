import { useState } from "react";
import  Produto  from "../../../../models/Produto"
import { Link } from 'react-router-dom'
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'


interface CardProdutosAdminProps {
    item: Produto;
    hasOptions?: boolean;
}

function CardProdutosAdmin({ item, hasOptions }: CardProdutosAdminProps) {

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
                    <div className="flex">
                        <button onClick={() => toggleOptions(0)} className="text-gray-600 focus:outline-none">
                            <FiMoreHorizontal size={20} />
                        </button>  
                        {openOptions === 0 && (   
                            <div className="absolute top-6 right-0 bg-white border rounded shadow-lg z-10"> 
                                {/* Botão Editar */}
                                <Link to={`/admin/editarproduto/${item.id}`} className="w-full text-slate-100 bg-lime-600 hover:bg-gray-600 flex items-center justify-center py-2">
                                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FiEdit className="mr-2" /> Editar
                                    </button>
                                </Link>

                                {/* Botão Deletar */}
                                <Link to={`/admin/deletarproduto/${item.id}`} className="text-white bg-gray-800 hover:bg-red-700 w-full flex items-center justify-center">
                                    <button>Deletar</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardProdutosAdmin
