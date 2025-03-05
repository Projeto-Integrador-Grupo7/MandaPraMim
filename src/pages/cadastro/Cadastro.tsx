import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {

  // função de navegação da pag
  const navigate = useNavigate()
  
  //variavel de estdao
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta("Usuário foi cadastrado com sucesso!", "sucesso")
      }catch(error){
        ToastAlerta("Erro ao cadastrar o usuário!", "erro")
      }
    }else{ 
      if (confirmaSenha != usuario.senha && usuario.senha.length < 8) {
        ToastAlerta("Dados do usuário ou senha inconsistentes! Verifique as informações do cadastro.", "erro")
        setUsuario({...usuario, senha: ''})
        setConfirmaSenha('')
      }
    } 

    setIsLoading(false)
  }

  return (
    <>
    {/* place-... = justifica e alinha os elementos em um container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold bg-yellow-400">

        <form className='flex justify-center items-center flex-col w-2/3 gap-3 text-black text-xl' onSubmit={cadastrarNovoUsuario} >
          <h2 className=' text-6xl'>Cadastro</h2>
          
          <div className="flex flex-col w-full ">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
            // placeholder = é o texto que aparece na caixa antes do usuário digitar
              placeholder="Nome" 
              className="rounded-3xl bg-white p-2 h-13"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
             
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="rounded-3xl bg-white p-2 h-13"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="rounded-3xl bg-white p-2 h-13"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded-3xl bg-white p-2 h-13"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="rounded-3xl bg-white p-2 h-13"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around w-full gap-8">
            {/* hover... = atribui uma cor quando o mouse passa por cima do elemento */}
            <button className='rounded text-white bg-slate-400 
                  hover:bg-slate-950 w-1/2 py-2' onClick={retornar}>
              Cancelar
            </button>

            <button 
                type='submit'
                className='rounded-4xl bg-[#ea5804] hover:bg-black text-white w-1/2 py-2
                           flex justify-center' 
            >
                {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                /> :
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>

        <div className="fundoCadastro hidden lg:block "></div>
      </div>
    </>
  )
}

export default Cadastro