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

    // const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    //     useEffect(() => {
    //       // Define um temporizador para ocultar a imagem após 3 segundos (3000 milissegundos)
    //       const timer = setTimeout(() => {
    //           setShowImage(false);
    //       }, 1200);

    //       // Limpa o temporizador quando o componente é desmontado
    //       return () => clearTimeout(timer);
    //   }, []);

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
            {/* {showImage ? ( // Mostra a imagem enquanto showImage é verdadeiro
        <div className="h-screen w-full hiden">
            <img 
              className='h-screen w-full'
              src="https://ik.imagekit.io/pphc/fundo?updatedAt=1741234512704" alt="Splash Screen" />
        </div>
    ) : ( // Mostra o formulário de login quando showImage é  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f5c840ff] h-screen items-center font-bold mx-0">
                <div className='w-full max-w-[90%] md:max-w-[50%] justify-self-center md:justify-self-end'>
                    <h1 className="text-4xl md:text-6xl py-6 md:py-9 text-center">Seja Bem-Vindo</h1>
                    <form className="flex mx-auto items-center flex-col w-full gap-6 p-4" onSubmit={login}>
                        <div className="flex flex-col w-full text-lg md:text-xl">
                            <label htmlFor="usuario">E-mail</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="e-mail"
                                className="bg-white rounded-2xl p-2 h-14 w-full"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full text-lg md:text-xl">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="senha"
                                className="bg-white rounded-2xl p-2 h-14 w-full"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button
                            type='submit'
                            className="w-full md:w-1/2 lg:w-1/3 rounded-4xl bg-[#ea5804] hover:bg-black flex justify-center text-white py-4">

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
                        <hr className="border-amber-800 w-full" />
                        <p className='text-amber-700 text-lg'>
                            Ainda não tem uma conta?{' '}
                            <Link to='/cadastro' className='text-rosa-neon underline'> Cadastre-se </Link>
                        </p>

                    </form>
                </div>
                <div className="fundoLogin hidden lg:block h-full w-full bg-cover bg-center"></div>
            </div>
            {/* )} */}
        </>
    );
}

export default Login;

