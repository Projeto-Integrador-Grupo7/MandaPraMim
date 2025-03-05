import { FiMoreHorizontal } from "react-icons/fi"
import  Produto  from "../../../../models/Produto"
import { Link } from 'react-router-dom'
import { useState } from "react";

interface CardProdutosProps {
    item: Produto;
    hasOptions?: boolean;

}

function CardProdutos({ item, hasOptions }: CardProdutosProps) {

    const [openOptions, setOpenOptions] = useState<number | null>(null);

    const toggleOptions = (index: number) => {
    setOpenOptions(openOptions === index ? null : index);
    };



    return (
        <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
            <div>
                <div className="flex w-full bg-lime-600 py-2 px-4 items-center gap-4">
                    <img 
                        className='w-56 h-auto border-8 border-white mt-4 ml-4' 
                        src={item.foto} 
                        alt={'Foto do produto ${item.nome}'} 
                    />
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
            {hasOptions && (
                <div className="flex">
                    <button onClick={() => toggleOptions(0)} className="text-gray-600 focus:outline-none">
                        <FiMoreHorizontal size={20} />
                    </button>  
                    {openOptions === 0 && (   
                        <div className="absolute top-6 right-0 bg-white border rounded shadow-lg z-10"> 
                            {/* Botão Editar */}
                            <Link to={`/admin/editarproduto/${item.id}`} className="w-full text-slate-100 bg-lime-600 hover:bg-gray-600 flex items-center justify-center py-2">
                                <button>Editar</button>
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
    )
}

export default CardProdutos
