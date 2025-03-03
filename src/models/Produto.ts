import Usuario from './Usuario';
import Categoria from './Categoria';

export default interface Produto {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    preco: number;
    saudavel: boolean;
    categoria: Categoria | null;
    usuario: Usuario | null;
}