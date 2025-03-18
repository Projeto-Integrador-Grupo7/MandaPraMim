import { Link, useNavigate } from "react-router-dom";
import { useContext, ReactNode, useState } from "react";
import logo from "../../assets/img/homeimg/logo.png";
import ButtonShop from "../cart/cartbuttomshop/CartButtomShop";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    // Controle de acesso
    const tipoUsuario = localStorage.getItem("tipoUsuario");

    function logout() {
        handleLogout()
        localStorage.removeItem("tipoUsuario");
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    let component: ReactNode

    // Se o token for != de vazio, será apresentado o Navbar com o html/css definido
    if (usuario.token !== "") {
        component = (
            <div className="w-full bg-[#E65100]">
                {/* Navbar principal */}
                <nav className="w-full bg-[#E65100] min-h-[60px] py-2 flex items-center justify-between px-4 md:px-10">
                    {/* Logo + Menu de navegação */}
                    <div className="flex items-center gap-6">
                        <Link to="/home">
                            <img src={logo} alt="Logo" className="h-auto w-24 md:w-32" />
                        </Link>

                        {/* Menu de navegação para telas médias e grandes */}
                        <div className="hidden md:flex gap-4 lg:gap-6 text-lg lg:text-xl font-semibold text-white">
                            <Link to="/home" className="hover:underline">Início</Link>
                            <Link to="/loja" className="hover:underline">Loja</Link>

                            {tipoUsuario === "Admin" && (
                                <Link to="/admin" className="hover:underline">Admin</Link>
                            )}

                            <Link to="/perfil" className="hover:underline">Perfil</Link>
                            <Link to="/sobre" className="hover:underline">Sobre</Link>
                        </div>
                    </div>

                    {/* Ícone da sacola + Botão de login */}
                    <div className="flex items-center gap-2 md:gap-6">
                        {/* Wrapper para ButtonShop com estilos para fazer parecer proporcional */}
                        <div className="flex items-center rounded-full p-1 md:p-2">
                            <ButtonShop />
                        </div>

                        {/* Botão de logout */}
                        <button className="bg-black hover:bg-gray-500 text-white px-4 md:px-6 py-2 md:py-2 rounded-full text-lg lg:text-xl md:text-base font-semibold">
                            <Link to='/login' onClick={logout} className='hover:underline'>Sair</Link>
                        </button>

                        {/* Botão de menu mobile */}
                        <button
                            className="md:hidden ml-2 p-2 bg-black hover:bg-gray-800 text-white rounded-full focus:outline-none "
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Menu mobile */}
                {menuOpen && (
                    <div className="md:hidden bg-[#E65100] py-4 px-4 shadow-lg">
                        <div className="flex flex-col gap-4 text-lg font-semibold text-white">
                            <Link to="/home" className="hover:underline py-2 border-b border-orange-400" onClick={toggleMenu}>Início</Link>
                            <Link to="/loja" className="hover:underline py-2 border-b border-orange-400" onClick={toggleMenu}>Loja</Link>

                            {tipoUsuario === "Admin" && (
                                <Link to="/admin" className="hover:underline py-2 border-b border-orange-400" onClick={toggleMenu}>Admin</Link>
                            )}

                            <Link to="/perfil" className="hover:underline py-2 border-b border-orange-400" onClick={toggleMenu}>Perfil</Link>
                            <Link to="/sobre" className="hover:underline py-2" onClick={toggleMenu}>Sobre</Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Navbar;