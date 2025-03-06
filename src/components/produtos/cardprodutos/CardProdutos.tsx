import { useContext } from 'react';
import { Context } from '../../../contexts/CartContext';
import Produto from "../../../models/Produto";
import { Link } from 'react-router-dom';
import { FaBasketShopping } from "react-icons/fa6";

interface CardProdutosProps {
    item: Produto;
}

function CardProdutos({ item }: CardProdutosProps) {
    const { adicionarProduto } = useContext(Context);

    return (
        <div className="p-4 rounded-lg text-center max-w-xs mx-auto">
            <div>
                <Link to={`/produtodescricao/${item.id}`} className="block">
                    <img 
                    
                        className="rounded-lg object-cover w-[220px] h-[220px] mx-auto mb-3 " 
                        src={item.foto} 
                        alt={`Foto do produto ${item.nome}`} />
                    
                </Link>
                
            </div>
            <h2 className="text-black text-2xl font-bold">{item.nome}</h2>      
            <p className="text-black text-md font-semibold mb-2">R${item.preco.toFixed(2)}</p>

            <button
                className="text-white font-bold py-2 px-4 rounded-full bg-[#E65100] border-2 border-black hover:bg-orange-400 transition-colors flex items-center justify-center mx-auto"
                onClick={() => adicionarProduto(item)}
            >
                <FaBasketShopping className="mr-2" />
                Adicionar ao carrinho
            </button>
        </div>
    );
}

export default CardProdutos;
