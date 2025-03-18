import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f5c840ff] h-screen items-center font-bold px-25">
            <div className='flex flex-col items-center justify-center w-full mx-auto'>
                <div className='w-full max-w-md'>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl py-4 md:py-6 text-center my-6">Seja Bem-Vindo</h1>
                    <form className="flex flex-col w-full gap-4 md:gap-6" onSubmit={login}>
                        <div className="flex flex-col w-full text-base md:text-lg">
                            <label htmlFor="usuario" className="mb-1">E-mail</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="e-mail"
                                className="bg-white rounded-xl md:rounded-2xl p-2 h-12 md:h-14 w-full"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full text-base md:text-lg">
                            <label htmlFor="senha" className="mb-1">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="senha"
                                className="bg-white rounded-xl md:rounded-2xl p-2 h-12 md:h-14 w-full"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button
                            type='submit'
                            className="w-full md:w-2/3 mx-auto rounded-full bg-[#ea5804] hover:bg-black flex justify-center text-white py-3 md:py-4 mt-2">
                            {isLoading ?
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> :
                                <span>Entrar</span>
                            }
                        </button>

                        <hr className="border-amber-800 w-full my-4" />

                        <p className='text-amber-700 text-sm md:text-base text-center'>
                            Ainda não tem uma conta?{' '}
                            <Link to='/cadastro' className='text-rosa-neon underline hover:text-amber-900'>
                                Cadastre-se
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Imagem de fundo - visível apenas em telas grandes */}
            <div className="fundoLogin my-auto mx-30 hidden lg:block "></div>
        </div>
    );
}

export default Login;