import { useState, useEffect, useContext } from "react";
import { buscar } from "../services/Service";
import Produto from "../models/Produto";
import { AuthContext } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react'; // Importando o Swiper

function CarrosselProdutos() {
    const { usuario } = useContext(AuthContext); // Pegando o token do usuário
    const [produtosRecomendados, setProdutosRecomendados] = useState<Produto[]>([]);

    useEffect(() => {
        async function fetchProdutos() {
            if (usuario.token) {
                try {
                    await buscar('/produtos/recomendar-saudaveis', setProdutosRecomendados, {
                        headers: { Authorization: `Bearer ${usuario.token}` },
                    });
                } catch (error) {
                    console.error('Erro ao buscar produtos saudáveis:', error);
                }
            }
        }

        fetchProdutos();
    }, [usuario.token]); // Recarrega a requisição se o token mudar

    return (
        <div className="carrossel-container">
            <h2 className="text-2xl text-center mb-4">Recomendações Saudáveis</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
            >
                {produtosRecomendados.length > 0 ? (
                    produtosRecomendados.map((item) => (
                        <SwiperSlide key={item.id}>
                            <img src={item.foto} alt={item.nome} className="rounded-lg" />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </Swiper>
        </div>
    );
}

export default CarrosselProdutos;
