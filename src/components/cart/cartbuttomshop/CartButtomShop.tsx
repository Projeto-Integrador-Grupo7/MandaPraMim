import { useContext, useState } from "react";
import { ShoppingBag } from "lucide-react";
import CartModal from "../cartmodal/CartModal";
import { Context } from "../../../contexts/CartContext";

export default function ButtonShop() {
    const { items, removerProduto } = useContext(Context);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            {/* Botão da sacola remodelado para ser igual ao botão Sair */}
            <button
                className=" hover:text-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-lg lg:text-xl md:text-base font-semibold flex items-center justify-center"
                onClick={() => setIsCartOpen(true)}
            >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Sacola
                {/* Contador de itens */}
                {items.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {items.length}
                    </span>
                )}
            </button>

            {/* Modal do Carrinho */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={items}
                removeFromCart={removerProduto}
            />
        </>
    );
}