import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Perfil() {

    const navigate = useNavigate()
    const { usuario, handleUpdateUser } = useContext(AuthContext)

    const [userData, setUserData] = useState(usuario)


    
    // Verificar se o usuário está logado
    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "alerta")
            navigate("/")
        }
    }, [usuario.token, navigate])

    // Atualizar os dados do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    // Função para o envio do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleUpdateUser(userData) // Chama a função de atualização com os dados do formulário
    }

    return (    

        <div className='grid grid-cols-2 bg-yellow-400 w-full'>
  
            <div className="font-semibold text-2xl">
                <h1 className='justify-center text-black py-20 text-6xl'  >
                    Dados
                </h1>
                <form onSubmit={handleSubmit} className="justify-center items-center w-2/3 px-4 py-8 bg-white rounded-xl shadow-neutral-500 ">
                  
                    <div className="mb-4">
                        <label className="block text-lg">Nome:</label>
                        <input 
                            type="text" 
                            name="nome" 
                            value={userData.nome} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-md" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg">Email:</label>
                        <input 
                            type="email" 
                            name="usuario" 
                            value={userData.usuario} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-md" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg">Senha:</label>
                        <input 
                            type="password" 
                            name="senha" 
                            value={userData.senha} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-md" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg">Foto (URL):</label>
                        <input 
                            type="text" 
                            name="foto" 
                            value={userData.foto} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-md" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-gray-600 text-white rounded-4xl hover:bg-black "
                    >
                        Atualizar
                    </button>
                </form>
            </div>

            <div className='my-auto'>
            <img 
                className='rounded-full w-56 relative mx-0' 
                src={usuario.foto} 
                alt={`Foto de perfil`} />
            <h1 className='font-semibold text-2xl py-2 justify-center' >{usuario.nome}</h1>
            <h2 className='font-semibold text-xl' >{usuario.usuario}</h2>
            </div>
        </div>
    )
}

export default Perfil

