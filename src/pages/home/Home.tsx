import VideoBg from '../../assets/videos/bg_video.mp4';
import ListaCategorias from '../../components/categorias/listacategorias/ListaCategorias';
import CarrosselProdutos from '../../utils/Carrossel';


function Home() {
    return (
        <>
            {/* Banner Principal */}
            <div className="relative w-full h-screen">
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
                    <h1 className="text-6xl font-extrabold">
                        Manda Pra Mim <span className="block">Delivery</span>
                    </h1>
                    <p className="mt-4 text-lg">
                        Porque o prazer de comer bem começa com um pedido
                    </p>
                    {/* Barra de Pesquisa */}
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Pesquisar por produtos"
                            className="w-96 p-3 rounded-full text-black shadow-md focus:outline-none bg-white"
                        />
                    </div>
                </div>
            </div>
    
    
            < ListaCategorias />
            < CarrosselProdutos />
            
            
        </>
    );
}

export default Home;
