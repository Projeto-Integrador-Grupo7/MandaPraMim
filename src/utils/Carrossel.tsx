import { useState, useEffect, useContext } from "react";
import { buscar } from "../services/Service";
import Produto from "../models/Produto";
import { AuthContext } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react"; // Importando o Swiper
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";

function CarrosselProdutos() {
    const navigate = useNavigate(); // Hook para navegação
    const { usuario } = useContext(AuthContext); // Pegando o token do usuário
    const [produtosRecomendados, setProdutosRecomendados] = useState<Produto[]>([]);
    const [indexAtual, setIndexAtual] = useState(0);
    const token = usuario.token;

    useEffect(() => {
        async function buscarProdutos() {
            if (usuario.token) {
                try {
                    await buscar("/produtos/recomendar-saudaveis", setProdutosRecomendados, {
                        headers: { Authorization: token },
                    });
                } catch (error) {
                    console.error("Erro ao buscar produtos saudáveis:", error);
                }
            }
        }

        buscarProdutos();
    }, [usuario.token]); // Recarrega a requisição se o token mudar

    // Atualiza os produtos visíveis a cada 5 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndexAtual((prevIndex) =>
                prevIndex + 5 >= produtosRecomendados.length ? 0 : prevIndex + 1
            );
        }, 5000); // Altera a cada 5 segundos

        return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar
    }, [produtosRecomendados]);

    // Pega apenas 5 produtos a partir do índice atual
    const produtosVisiveis = produtosRecomendados.slice(indexAtual, indexAtual + 5);

    return (
        <section className="w-full bg-[#f5c840ff] py-10">
            <h2 className="text-4xl font-bold text-center text-[#E65100] mb-6">
                Confira nossos <span className="text-black">Produtos Saudáveis</span>
            </h2>

            <div className="text-center mb-6">
                <button
                    onClick={() => navigate("/produtossaudaveis")}
                    className="text-white py-2 px-6 rounded-lg bg-[#E65100] hover:bg-orange-300 transition"
                >
                    Ver Todos os Produtos
                </button>
            </div>

            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={15}  // Ajuste o espaço entre os slides
                    slidesPerView={1}  // Inicialmente, um slide por vez
                    navigation
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1, // Um slide por vez em telas pequenas
                            spaceBetween: 10, // Menos espaço entre os slides em dispositivos móveis
                        },
                        768: {
                            slidesPerView: 2, // Dois slides por vez em tablets
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3, // Três slides por vez em telas grandes
                            spaceBetween: 20,
                        },
                    }}
                    className="w-full"
                >
                    {produtosVisiveis.map((item) => (
                        <SwiperSlide key={item.id} className="relative group">
                            <img
                                src={item.foto}
                                alt={item.nome}
                                className="w-full h-[300px] object-cover rounded-lg" // Ajustando a altura para ser mais responsiva
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white rounded-b-lg">
                                <h3 className="text-xl font-bold">{item.nome}</h3>
                                <p className="text-sm">{item.descricao}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default CarrosselProdutos;
