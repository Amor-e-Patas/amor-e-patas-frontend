
import axios, { authenticatedAPI } from "../services/services";
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
        throw error;
    }
}


export async function getUser(){
    try{
      const response = await authenticatedAPI.get(`/user/10`);
      return response.data;
    } catch (err) {
      throw err;
    } 
  }

  /*useEffect(() => {
    api.get(`prescription/${id}`).then((response) => {
        const date = new Date(response.data.date);
        const ddmmyyyyDate = `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
        response.data.formatedDate = ddmmyyyyDate;
        setPrescription(response.data);
    });
}, [id]);*/