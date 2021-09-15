
import axios, { authenticatedAPI } from "../services/services";
export async function criarAnimal(nome_ani: string,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    temperamentos: Array<Number>,
    sociaveis: Array<Number>,
    vivencias: Array<Number>,) {
    try {
        const res = await authenticatedAPI.post("/animal", {
            nome_ani,
            idade,
            cor,
            caracteristica_animal,
            data_nasc,
            desaparecido,
            id_usuario,
            id_porte,
            id_especie,
            id_sexo,
            temperamentos,
            sociaveis,
            vivencias
        })
        return res.data.id_animal;
} catch (error) {
    throw error;
}
}


export async function getAnimais() {
    try {
        const response = await authenticatedAPI.get(`/animais`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getAnimal() {
    try {
        const response = await authenticatedAPI.get(`/animal/2`);
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
        const response = await authenticatedAPI.put("/animal/11", {
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

export async function getAniTemperamentos() {
    try {
        const response = await authenticatedAPI.get(`/anitemps/11`);
        return response.data;
    } catch (err) {
        throw err;
    }
}