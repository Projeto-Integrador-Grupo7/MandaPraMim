import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }



    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-yellow-400 h-screen place-items-center font-bold ">
                <div className=' bg-pink-300 items-center justify-center'>
                    <form className="flex mx-auto items-center  flex-col w-xl gap-4"  onSubmit={login}>
                        <h1 className="text-6xl  py-3">Login</h1>
                    
                        <div className="flex flex-col w-full text-xl ">
                            <label htmlFor="usuario">E-mail</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="e-mail"
                                className="bg-white rounded-2xl p-2 h-14 "
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full text-xl">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                className="bg-white rounded-2xl p-2 h-14"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button 
                            type='submit' 
                            className="rounded-4xl bg-[#ea5804] hover:bg-black flex justify-center text-white py-4 w-30">

                            {isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            
                                <span>Entrar</span>
                            }
                        </button>

                        <hr className="border-orange-600 w-full" />

                        
                        <p className='text-white'>
                            Ainda não tem uma conta?{' '}
                            <Link to='/cadastro'className='text-rosa-neon underline'> Cadastre-se </Link>
                        
                        </p>
                    </form>
                </div>

            
                <div className="fundoLogin bg-amber-800 my-auto mx-30 hidden lg:block "></div>
                
                
                
            </div>
        </>
    );
}

export default Login;
