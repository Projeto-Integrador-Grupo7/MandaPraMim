import VideoBg from '../../assets/videos/VideoEntregador.mp4';
import ListaCategorias from '../../components/categorias/listacategorias/ListaCategorias';
import CarrosselProdutos from '../../utils/Carrossel';

function Home() {
    return (
        <div className="min-h-screen w-full bg-[#f5c840ff] flex flex-col items-center">
            {/* Banner Principal */}
            <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-screen overflow-hidden">
                {/* Vídeo de fundo */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={VideoBg} type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>

                {/* Sobreposição para melhorar contraste do texto */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Conteúdo do Banner */}
                <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        Manda Pra Mim <span className="block">Delivery</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base lg:text-lg">
                        Porque o prazer de comer bem começa com um pedido
                    </p>
                    {/* Barra de Pesquisa */}
                    <div className="mt-6 w-full max-w-xl sm:max-w-lg lg:max-w-xl">
                        <input
                            type="text"
                            placeholder="Pesquisar por produtos"
                            className="w-full p-3 rounded-full text-black shadow-md focus:outline-none bg-white text-center"
                        />
                    </div>
                </div>
            </div>

            {/* Categorias */}
            <div className="w-full">
                <ListaCategorias />
            </div>

            {/* Carrossel de Produtos */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <CarrosselProdutos />
            </div>
        </div>
    );
}

export default Home;
