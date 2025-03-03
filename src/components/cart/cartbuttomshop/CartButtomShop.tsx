import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import CartModal from "../cartmodal/CartModal";
import  Produto  from "../../models/Produto"; // Importando sua model

export default function ButtonShop() {
    const [cart, setCart] = useState<Produto[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (produto: Produto) => {
        setCart([...cart, produto]);
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    return (
        <>
        <button
            className="mt-4 hover:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center "
            onClick={() => setIsCartOpen(true)}
        >
            <ShoppingBag  className="mx-2 w-12 h-12"/>
            Sacola
        </button>

        <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            removeFromCart={removeFromCart}
        />
        </>
    );
    }
