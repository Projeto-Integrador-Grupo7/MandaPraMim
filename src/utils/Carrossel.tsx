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
        <section className="w-full bg-gray-100 py-10">
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-6">
                Confira nossos <span className="text-black">Produtos Saudáveis</span>
            </h2>

            <div className="text-center mb-6">
                <button
                    onClick={() => navigate("/produtossaudaveis")}
                    className="text-white py-2 px-6 rounded-lg bg-[#021859] hover:bg-blue-900 transition"
                >
                    Ver Todos os Produtos
                </button>
            </div>

            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {produtosRecomendados.map((item) => (
                        <SwiperSlide key={item.id} className="relative group">
                            <img
                                src={item.foto}
                                alt={item.nome}
                                className="w-full h-[350px] object-cover rounded-lg"
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
