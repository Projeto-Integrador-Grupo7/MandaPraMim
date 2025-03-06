import { useContext, useState } from "react";
import { ShoppingBag } from "lucide-react";
import CartModal from "../cartmodal/CartModal";
import { Context } from "../../../contexts/CartContext"; // Importando o contexto do carrinho

export default function ButtonShop() {
    const { items, removerProduto } = useContext(Context); // Consumindo o contexto para obter os itens do carrinho
    const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar a abertura do modal

    return (
        <>
            {/* Ícone da sacola */}
            <button
                className="mt-4 text-white hover:text-black px-6 py-2 rounded-lg flex items-center relative"
                onClick={() => setIsCartOpen(true)} // Abre o modal do carrinho
            >
                <ShoppingBag className="mx-2 w-12 h-12 hover:text-black" />
                Sacola
                {/* Exibe o número de itens no carrinho */}
                {items.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-1">
                        {items.length}
                    </span>
                )}
            </button>

            {/* Modal do Carrinho */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)} // Fecha o modal
                cart={items} // Passa os itens do carrinho para o modal
                removeFromCart={removerProduto} // Passa a função para remover itens do carrinho
            />
        </>
    );
}
