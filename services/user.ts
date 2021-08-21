
import axios from "../services/services";
export async function criarUsuario(nome_usu: string,
    cpf: string,
    genero: string,
    data_nasc: string,
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
            nome_usu,
            cpf,
            genero,
            data_nasc,
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