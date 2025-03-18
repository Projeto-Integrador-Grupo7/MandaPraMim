import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardprodutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { motion } from "framer-motion";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ListaProdutosProps {
    categoriaId: number;
}

function ListaProdutos({ categoriaId }: ListaProdutosProps) {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutos() {
        setIsLoading(true);
        try {
            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: token,
                },
            });
            setIsLoading(false);
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'alerta');
            navigate('/');
        } else {
            buscarProdutos();
        }
    }, [token]);

    useEffect(() => {
        if (categoriaId === 0) {
            setProdutosFiltrados(produtos);
        } else {
            setProdutosFiltrados(produtos.filter(produto => produto.categoria && produto.categoria.id === categoriaId));
        }
        setCount(categoriaId === 0 ? produtos.length : produtos.filter(produto => produto.categoria && produto.categoria.id === categoriaId).length);
    }, [categoriaId, produtos]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <>
            <div className="flex justify-between items-center mx-8 my-4">
                <p className="text-black font-medium mx-8">{count} produtos</p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">Carregando produtos...</p>
                </div>
            ) : (
                <motion.div
                    className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {produtosFiltrados.map((produto) => (
                        <motion.div key={produto.id} variants={item}>
                            <CardProdutos item={produto} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
}

export default ListaProdutos;