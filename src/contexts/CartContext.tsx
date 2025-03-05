import { createContext, ReactNode, useState } from "react";
import  Produto from "../models/Produto";

// Adicionar apenas as propriedades a Inteface já existente
interface ContextProps {
    adicionarProduto: (produto: Produto) => void
    removerProduto: (produtoId: number) => void
    limparCart: () => void
    items: Produto[]
    quantidadeItems: number
}

interface ContextProviderProps {
    children: ReactNode
}

export const Context = createContext({} as ContextProps)

export function Provider({ children }: ContextProviderProps) {

    // Adicione APENAS essa linhas de código daqui
    const [items, setItems] = useState<Produto[]>([])

    const quantidadeItems = items.length

    // Essa sintaxe guarda as info anteriores do State e atualiza com os novos dados(objetos)
    function adicionarProduto(produto: Produto) {
        setItems(state => [...state, produto])
    }

    // Remove a quantidade de um produto especifico
    function removerProduto(produtoId: number) {

        // O findIndex() verifica se o ID do produto informado consta no Array, e pega a posição/indice desse item no Array
        const indice = items.findIndex(items => items.id === produtoId) 
        let novoCart = [...items]   // Faz uma cópia do Carrinho anterior, apenas como variavel auxiliar

        // Se o index é maior que 0, o método splice(), vai encontrar esse item no Array e o remover
        if(indice >= 0){
            novoCart.splice(indice, 1)
            setItems(novoCart)  // Atualiza o Carrinho
        }
    }

    function limparCart() {
        alert("Compra Efetuada com Sucesso")
        setItems([])
    }

    // Até aqui

    return (    // Adicionar as propriedades ao Provider já existente
        <Context.Provider value={{ adicionarProduto, removerProduto, limparCart, items, quantidadeItems }}>
            {children}
        </Context.Provider>
    )

}