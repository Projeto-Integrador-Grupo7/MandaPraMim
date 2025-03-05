import { Link } from "react-router-dom";
import logo from "../../assets/img/homeimg/logo.png";
import ButtonShop from "../cart/cartbuttomshop/CartButtomShop";

function Navbar() {
    return (
        <nav className="w-full bg-[#E65100] min-h-[60px] py-4 flex items-center justify-between px-10">
            {/* Logo + Menu de navegação */}
            <div className="flex items-center gap-6">
                <Link to="/home">
                    <img src={logo} alt="Logo" className="h-auto w-32" />
                </Link>

                {/* Menu de navegação */}
                <div className="hidden md:flex gap-6 text-lg font-semibold text-black">
                    <Link to="/home" className="hover:underline">Início</Link>
                    <Link to="/loja" className="hover:underline">Loja</Link>
                    <Link to="/admin" className="hover:underline">Perfil</Link>
                    <Link to="/sobre" className="hover:underline">Sobre</Link>
                    <Link to="/listaprodutos" className="hover:underline">Teste</Link>
                </div>
            </div>

            {/* Ícone da sacola + Botão de login */}
            <div className="flex items-center gap-8">
                {/* Botão do Carrinho */}
                <div className="mt-0">
                    <ButtonShop />
                </div>

                {/* Botão de login */}
                <Link to="/login">
                    <button className="bg-black hover:bg-gray-400 text-white mt-2 px-8 py-3 rounded-full text-lg font-semibold">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
