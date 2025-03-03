import { useState } from "react";
import Produto from "../../models/Produto"; // Importando a model

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: Produto[];
    removeFromCart: (id: number) => void;
}

export default function CartModal({ isOpen, onClose, cart, removeFromCart }: CartModalProps) {
    const total = cart.reduce((sum, produto) => sum + produto.preco, 0);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Conteúdo do carrinho */}
            <div className="p-6">
                <header className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Carrinho de Compras</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
                </header>

                {cart.length === 0 ? (
                    <p className="mt-4 text-gray-600">O carrinho está vazio.</p>
                ) : (
                    <ul className="space-y-3 mt-4">
                        {cart.map((produto) => (
                            <li key={produto.id} className="flex justify-between items-center">
                                <span>{produto.nome} - R$ {produto.preco}</span>
                                <button
                                    onClick={() => removeFromCart(produto.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded-sm text-sm"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="mt-4 font-bold">Total: R$ {total}</p>

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
