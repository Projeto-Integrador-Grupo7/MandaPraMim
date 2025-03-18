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

    return (
        <section className="w-full bg-[#f5c840ff] py-10 px-4 sm:px-6 lg:px-8">
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

            <div className="container mx-auto">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    breakpoints={{
                        480: { slidesPerView: 1, spaceBetween: 5 },  // Ajuste para telas muito pequenas
                        768: { slidesPerView: 2, spaceBetween: 10 }, // Ajuste para tablets
                        1024: { slidesPerView: 3, spaceBetween: 15 }, // Ajuste para telas grandes
                        1280: { slidesPerView: 4, spaceBetween: 20 }, // Ajuste para telas maiores
                    }}
                    className="w-full"
                >
                    {produtosRecomendados.map((item) => (
                        <SwiperSlide key={item.id} className="relative group flex justify-center">
                            <div className="w-full max-w-xs">
                                <img
                                    src={item.foto}
                                    alt={item.nome}
                                    className="w-full h-[350px] object-cover rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white rounded-b-lg">
                                    <h3 className="text-xl font-bold">{item.nome}</h3>
                                    <p className="text-sm">{item.descricao}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default CarrosselProdutos;
