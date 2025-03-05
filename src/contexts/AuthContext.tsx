import { createContext, ReactNode, useState } from "react"
import UsuarioLogin from "../models/UsuarioLogin"
import { login, atualizar } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"

// Define a estrutura do Contexto
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    handleUpdateUser(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

// Define a estrutura do Componente Provedor
interface AuthProviderProps {
    children: ReactNode
}

// Constroi e exporta o Contexto
export const AuthContext = createContext({} as AuthContextProps)

// Constroi e exporta o AuthProvider (gerenciar o contexto da aplicação)
export function AuthProvider({ children }: AuthProviderProps) {

    // Definir o estado para armazenar as informações do usuário autenticado
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    // Função para fazer login do usuário
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false)
    }

    // Função para atualizar as informações do usuário
    async function handleUpdateUser(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await atualizar(`/usuarios/atualizar`, usuarioLogin, setUsuario, {
                headers: { Authorization: usuario.token }
            })
            ToastAlerta("Usuário foi atualizado com sucesso!", "sucesso")
            handleLogout();
            ToastAlerta("Você será desconectado", "alerta")
        } catch (error) {
            ToastAlerta("Erro ao atualizar perfil!", "erro")
        }
        setIsLoading(false)
    }

    // Função para realizar o logout
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleUpdateUser, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
