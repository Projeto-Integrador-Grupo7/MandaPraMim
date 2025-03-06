import { useState } from 'react';
import { FiEdit, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Produto from "../../../../models/Produto";
import { deletar } from '../../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../../utils/ToastAlerta';


interface CardProdutosAdminProps {
    item: Produto;
    hasOptions?: boolean;
    token: string;
    atualizarProdutos: () => void;
}

function CardProdutosAdmin({ item, token, atualizarProdutos }: CardProdutosAdminProps) {
    const [openOptions, setOpenOptions] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const precoEmReais = item.preco; // Este é o valor decimal
    const precoFormatado = precoEmReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const toggleOptions = (index: number) => {
        setOpenOptions(openOptions === index ? null : index);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const deletarProduto = async () => {
        setIsLoading(true);
        try {
            await deletar(`/produtos/${item.id}`, {
                headers: {
                    'Authorization': token
                }
            });

            ToastAlerta('Produto deletado com sucesso', 'sucesso');
            atualizarProdutos();
        } catch (error: any) {
            ToastAlerta('Erro ao deletar produto:', 'error');
            if (error.response) {
                console.log(`Erro ao deletar o produto: ${error.response.data.message || 'Erro desconhecido'}`);
            } else if (error.request) {
                ToastAlerta('Sem resposta do servidor. Verifique sua conexão.', 'alert');
            } else {
                ToastAlerta('Erro ao processar a solicitação de deletar.', 'erro');
            }
        } finally {
            setIsLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Imagem com texto overlay */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src={item.foto}
                    alt={`Foto do produto ${item.nome}`}
                    className="w-full h-full object-cover"
                />
                {/* Overlay gradiente escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Badge de saudável, se aplicável */}
                {item.saudavel && (
                    <div className="absolute top-4 left-4 bg-lime-500 px-3 py-1 rounded-full text-white font-medium shadow-md">
                        Saudável
                    </div>
                )}

                {/* Botão de opções reposicionado para o canto superior direito */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => toggleOptions(0)}
                        className="bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white focus:outline-none shadow-md"
                    >
                        <FiMoreHorizontal size={20} />
                    </button>

                    {openOptions === 0 && (
                        <div className="absolute top-full right-0 mt-1 bg-white border rounded shadow-lg z-10 w-32">
                            <Link to={`/admin/editarproduto/${item.id}`}>
                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full justify-start">
                                    <FiEdit className="mr-2" /> Editar
                                </button>
                            </Link>

                            <button
                                onClick={handleOpenDeleteModal}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full justify-start"
                            >
                                <FiTrash2 className="mr-2" /> Deletar
                            </button>
                        </div>
                    )}
                </div>

                {/* Nome do produto como overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white text-2xl font-bold">{item.nome}</h4>
                </div>
            </div>

            {/* Conteúdo do card */}
            <div className="p-4 bg-white">
                <p className="text-gray-700 text-sm mb-3">{item.descricao}</p>

                {/* Categoria com destaque */}
                <div className="mb-3">
                    <span className="inline-block bg-lime-100 text-lime-800 px-3 py-1 rounded-lg font-medium text-sm">
                        {item.categoria?.descricao || "Sem categoria"}
                    </span>
                </div>

                {/* Quantidade com destaque */}
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        <div className="bg-gray-200 px-2 py-1 rounded-l-md text-xs text-gray-700 font-medium uppercase">
                            ESTOQUE
                        </div>
                        <div className="bg-gray-800 px-3 py-1 rounded-r-md text-white font-bold">
                            {item.quantidade}
                        </div>
                    </div>
                </div>

                {/* Preço do produto */}
                <div className="mt-4">
                    <span className="text-lg font-bold text-gray-800">
                        {item.preco > 0 ? precoFormatado : 'Grátis'}
                    </span>
                </div>
            </div>

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-96 p-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Confirmar Exclusão
                        </h2>

                        <p className="text-center text-gray-600 mb-6">
                            Tem certeza que deseja deletar o produto "{item.nome}"?
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleCloseDeleteModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={deletarProduto}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                ) : (
                                    <>
                                        <FiTrash2 className="mr-2" /> Deletar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardProdutosAdmin;
