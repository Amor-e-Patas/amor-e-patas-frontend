
import axios, { authenticatedAPI } from "../services/services";
export async function criarImgAnimal(
    imagens: Array<File>,
    id_animal: string) {
    try {
        const data = new FormData();
        data.append('id_animal', id_animal);
        imagens.forEach(image => {
            data.append('image', image);
          });
        await authenticatedAPI.post("/imagem", data);
} catch (error) {
    throw error;
}
}


export async function getImgAnimal() {
    try {
        const response = await authenticatedAPI.get(`/imagens`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function alterarAnimal(nome_ani: string,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number) {
    try {
        const response = await authenticatedAPI.put("/animal", {
            nome_ani,
            idade,
            cor,
            caracteristica_animal,
            data_nasc,
            desaparecido,
            id_usuario,
            id_porte,
            id_especie,
            id_sexo
        });
        return
    } catch (err) {
        throw err;
    }
}