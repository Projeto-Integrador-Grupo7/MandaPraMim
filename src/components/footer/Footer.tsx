import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, ReactNode } from "react";

function Footer() {
    const data = new Date().getFullYear();

    const { usuario } = useContext(AuthContext);

    let component: ReactNode



    // Se o token for != de vazio, será apresentado o Navbar com o html/css definido
    if (usuario.token !== "") {

        component = (
            <div className="w-full bg-[#E65100] text-white py-10 flex flex-col md:flex-row items-center md:items-start justify-between px-8 md:px-20">
                {/* Seção Centralizada */}
                <div className="flex justify-center flex-col items-center text-center md:w-1/2 ">
                    <h2 className="text-3xl font-bold">Manda Pra mim Delivery</h2>
                    <p className="text-lg mt-2">Descubra delícias saudáveis e saborosas aqui.</p>

                    {/* Ícones de redes sociais */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://github.com/Grupo777" target="_blank"><GithubLogo size={32} weight="bold" /></a>
                        <a href="mailto:generation.g777@gmail.com" target="_blank"><EnvelopeSimple size={32} weight="bold" /></a>
                    </div>

                    {/* Direitos autorais */}
                    <p className="text-sm mt-4">© Delivery Manda Pra Mim | Copyright: {data}.</p>
                </div>

                {/* Seção de Contato */}
                <div className="bg-transparent text-white md:w-1/2 md:ml-auto mt-8 md:mt-0 ">
                    <h3 className="text-lg font-bold mb-4 text-center md:text-left">ENTRE EM CONTATO CONOSCO</h3>
                    <form className="flex flex-col">
                        <label className="mb-1" htmlFor="name">Nome completo</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            className="w-full p-2 mb-4 rounded text-gray-800 bg-white"
                        />
                        <label className="mb-1" htmlFor="email">Email*</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Insira seu melhor email"
                            className="w-full p-2 mb-4 rounded text-gray-800 bg-white"
                        />
                        <label className="mb-1" htmlFor="message">Mensagem*</label>
                        <textarea
                            id="message"
                            placeholder="Escreva aqui..."
                            className="w-full p-2 mb-4 rounded text-gray-800 bg-white"
                        />
                        <button
                            type="submit"
                            className="bg-[#d2691e] text-white py-2 px-6 rounded-full hover:bg-[#a85d1c] mx-auto"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>



        )
    }



    return (
        <>
            {component}
        </>
    );
}

export default Footer;
