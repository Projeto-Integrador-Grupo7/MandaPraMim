import {  useContext, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
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
        <Link to='/Login' onClick={logout} className='hover:underline'>Login</Link>

        <Link to='/cadastro' className="hover:underline"> Cadastrar</Link>
        </>
        )
    }

    
    return (
        <>
    
            <div className='w-full flex justify-center py-0
            bg-gradient-to-r from-[#ea5804] via-[#ea5804] to-[#dd720d] text-rosa-neon'>
                {/* justify-between = posiciona os itens na horizontal e os distribui uniformemente */}
                {/* /* text-lg = define o tamanho da fonte e da linha  */}
                <div className="container flex justify-between text-lg font-grotesk py-5 px-3">

                    {/* Link = atribui a rota criada no App.tsx */}
                    <img 
                        src='https://ik.imagekit.io/pphc/logo.png?updatedAt=1741022260506'
                        alt = 'Logo'
                        className="w-1/18 my-0 mx-0"
                     />

                    <Link to='/home' className="text-2xl font-bold"> "logo" </Link>

                    {/* gap-4 = define o tamanho das lacunas entre os elementos */}
                    <div className='flex gap-6 text-indigo-950 font-semibold text-xl'>
                        {/* O 'Link to=' atribui a rota definida no App.tsx */}
                        <Link to='/postagens' className='hover:underline'>Inicio</Link>

                        <Link to='/temas' className="hover:underline"> Loja </Link>
                        
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>

                        <Link to='/sobre' className='hover:underline'>Sobre</Link>



                         {component}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar

