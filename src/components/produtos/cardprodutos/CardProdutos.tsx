import { useContext } from 'react';
import { Context } from '../../../contexts/CartContext';
import Produto from "../../../models/Produto";
import { Link } from 'react-router-dom';
import { FaBasketShopping } from "react-icons/fa6";
import { motion } from "framer-motion";

interface CardProdutosProps {
    item: Produto;
}

function CardProdutos({ item }: CardProdutosProps) {
    const { adicionarProduto } = useContext(Context);
    const precoEmReais = item.preco; // Este é o valor decimal
    const precoFormatado = precoEmReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <motion.div
            className="p-6 rounded-lg text-center max-w-xs mx-auto bg-[#f9da6c] shadow-md"
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/produtodescricao/${item.id}`} className="block">
                <motion.img
                    className="rounded-lg object-cover w-[220px] h-[220px] mx-auto mb-3"
                    src={item.foto}
                    alt={`Foto do produto ${item.nome}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
            </Link>

            <h2 className="text-black text-2xl font-bold h-16 line-clamp-2">
                {item.nome}
            </h2>
            <p className="text-black text-md font-semibold mb-4">{item.preco > 0 ? precoFormatado : 'Grátis'}</p>

            <motion.button
                className="text-white font-bold py-2 px-4 rounded-full bg-[#E65100] border-2 border-black hover:bg-orange-400 transition-colors flex items-center justify-center mx-auto"
                onClick={() => adicionarProduto(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaBasketShopping className="mr-2" />
                Adicione ao carrinho
            </motion.button>
        </motion.div>
    );
}

export default CardProdutos;