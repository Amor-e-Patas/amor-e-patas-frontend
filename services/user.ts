
import axios from "../services/services";
export async function criarUsuario(nome: string,
    cpf: string,
    genero: string,
    datanasc: string,
    celular: string,
    email: string,
    senha: string,
    endereco: string,
    numero: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    referencia : string) {
    try {
        await axios.post("/user", {
            nome,
            cpf,
            genero,
            datanasc,
            telefone: {
                num_telefone: celular
            },
            login: {
                email,
                senha
            },
            endereco: {
                endereco,
                numero,
                bairro,
                cep,
                cidade,
                estado,
                referencia
            }
        })
    } catch (error) {
        console.log(error);
    }
}