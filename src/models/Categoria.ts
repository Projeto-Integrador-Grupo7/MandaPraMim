import Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    produto?: Produto[] | null;
}