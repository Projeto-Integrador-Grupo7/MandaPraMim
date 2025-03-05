import { Link, useNavigate } from "react-router-dom";
import {  useContext, ReactNode } from "react";
import logo from "../../assets/img/homeimg/logo.png";
import ButtonShop from "../cart/cartbuttomshop/CartButtomShop";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    let component: ReactNode

    // Se o token for != de vazio, será apresentado o Navbar com o html/css definido
    if (usuario.token !== "") {

        component = (
            <button className="py-4 px-9 rounded-4xl bg-black text-white">    
                <Link to='/home' onClick={logout} className='hover:underline'>Sair</Link>
            </button>  

        )
    }else{
        component =(
            <>
             <Link to="/login">
                    <button className="bg-black hover:bg-gray-400 text-white mt-2 px-8 py-3 rounded-full text-lg font-semibold">
                        Login
                    </button>
                </Link>

        <Link to='/cadastro' className="hover:underline"> 
        <button className="bg-black hover:bg-gray-400 text-white mt-2 px-8 py-3 rounded-full text-lg font-semibold">
                        Cadastrar
                    </button>
        </Link>
        </>
        )
    }




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
                    <Link to="/admin" className="hover:underline">Adm</Link>
                    <Link to="/perfil" className="hover:underline">Perfil</Link>
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

                {component}
                {/* Botão de login */}
          
            </div>
        </nav>
    );
}

export default Navbar;
