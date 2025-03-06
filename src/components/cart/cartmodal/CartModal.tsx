import Produto from "../../../models/Produto"; // Importando o modelo do Produto
import { useContext } from "react";
import { Context } from "../../../contexts/CartContext";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: Produto[]; // Carrinho de compras
    removeFromCart: (id: number) => void; // Função para remover item do carrinho
}

export default function CartModal({ isOpen, onClose, cart, removeFromCart }: CartModalProps) {
    const { limparCart } = useContext(Context); // Pegando a função limparCart do contexto

    const total = cart.reduce((sum, produto) => sum + produto.preco, 0); // Calculando o total do carrinho

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-6">
                <header className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Sacola de Compras</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
                </header>

                {cart.length === 0 ? (
                    <p className="mt-4 text-gray-600">A sacola está vazia.</p>
                ) : (
                    <ul className="space-y-3 mt-4">
                        {cart.map((produto) => (
                            <li key={produto.id} className="flex justify-between items-center">
                                <span>{produto.nome} - R$ {produto.preco.toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(produto.id)} // Remove o produto do carrinho
                                    className="bg-red-500 text-white py-1 px-2 rounded-sm text-sm"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</p>

                <button
                    onClick={() => {
                        limparCart(); // Limpa o carrinho quando a compra for finalizada
                        onClose(); // Fecha a modal
                    }}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
                >
                    Finalizar Compra
                </button>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}
