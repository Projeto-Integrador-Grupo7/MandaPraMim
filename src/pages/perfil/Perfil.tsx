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

        <div className="flex justify-center items-center min-h-screen bg-[#f5c840ff] px-6">
        <div className="flex flex-col md:flex-row bg-[#f5c840ff] w-full max-w-5xl p-8 gap-10">
          {/* Formulário */}
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl text-center font-bold mb-6">Dados</h1>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4 text-xl">
              
              <div className="flex flex-col">
                <label className="font-semibold">Nome</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="seu nome"
                  value={userData.nome} 
                  onChange={handleChange} 
                  className="border p-3 rounded-md bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">E-mail</label>
                <input
                  type="email"
                  name="usuario"
                  placeholder="usuário/email"
                  value={userData.usuario}
                  onChange={handleChange}
                  className="border p-3 rounded-md bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Senha*</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={userData.senha}
                  onChange={handleChange}
                  className="border p-3 rounded-md bg-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Foto</label>
                <input
                  type="text"
                  name="foto"
                  placeholder="URL da foto"
                  value={userData.foto}
                  onChange={handleChange}
                  className="border p-3 rounded-md bg-white"
                />
              </div>
              <button  type="submit" 
              className=" text-white p-3 rounded-md bg-[#ea5804] hover:bg-black  ">
                Alterar dados
              </button>
            </form>
          </div>
  
          {/* Foto de perfil */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              src={usuario.foto}
              alt="Perfil"
              className="w-50 h-58 rounded-full object-cover border-4 border-white"
            />
           <h1 className='font-semibold text-2xl py-2 justify-center' >{usuario.nome}</h1>
           <h2 className='font-semibold text-xl' >{usuario.usuario}</h2>
          </div>
        </div>
      </div>

    )
}

export default Perfil

