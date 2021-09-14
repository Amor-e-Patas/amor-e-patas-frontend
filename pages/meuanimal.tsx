import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { criarAnimal, getAnimais } from "../services/animal";
import styles from "../styles/components/FormMeuAnimal.module.css";
import Button from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel";
import { getVivencia } from "../services/vivencia";
import { getAnimal } from "../services/animal";

interface Temp {
    id_temperamento: number,
    descricao: string
}

interface Soci {
    id_sociavel: number,
    descricao: string
}

interface Vive {
    id_vivencia: number,
    descricao: string
}

interface Animal {
    nome_ani: string
    images: Array<{
        filepath: string;
    }>;
}

export default function Usuario() {
    const [nome_ani, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [cor, setCor] = useState("");
    const [caracteristica_animal, setCaracteristica] = useState("");
    const [data_nasc, setData] = useState("");
    const [desaparecido, setDesaparecido] = useState("N");
    const [id_porte, setPorte] = useState("");
    const [id_usuario, setUsuario] = useState("");
    const [id_especie, setEspecie] = useState("");
    const [id_sexo, setSexo] = useState("");
    const router = useRouter();
    const [temperamentos, setTemperamentos] = useState(Array<Temp>());
    const [selectTemp, setSelectTemp] = useState(Array<Number>());
    const [sociaveis, setSociavel] = useState(Array<Soci>());
    const [selectSoci, setSelectSoci] = useState(Array<Number>());
    const [vivencias, setVivencia] = useState(Array<Vive>());
    const [selectVive, setSelectVive] = useState(Array<Number>());
    const [images, setImages] = useState<File[]>([]);
    const [previwImages, setPreviewImages] = useState<string[]>([]);
    const [animais, setAnimais] = useState(Array<Animal>());

    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                const vivencia = await getVivencia();
                const animais = await getAnimais();
                console.log(animais);

                //setTemperamentos(temperamento);
                //setSociavel(sociavel);
                //setVivencia(vivencia);
                setAnimais(animais);
                console.log(nome_ani);

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);


    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        };

        const selectedImages = Array.from(event.target.files);


        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }
    /*
        async function eventoCriarAnimal() {
    
            try {
                const id_animal = await
                    criarAnimal(nome_ani,
                        idade,
                        cor,
                        caracteristica_animal,
                        data_nasc,
                        desaparecido,
                        parseInt(id_usuario),
                        parseInt(id_porte),
                        parseInt(id_especie),
                        parseInt(id_sexo),
                        selectTemp,
                        selectSoci,
                        selectVive)
                await
                    criarImgAnimal(
                        images,
                        id_animal
                    )
                alert("Animal criado ;)");
                router.push("/cadastroanimal");
            } catch (error) {
                console.log(error);
                alert("Erro ao criar animal.")
            }
    
        }
    */
    return (
        <>
            <div >
                <Navbar />
                <div>
                    <div className={styles.quadros}>
                        <div className={styles.item}>
                            <img src="/img/sol.jpg" className={styles.imagem} alt="" />
                        </div>

                        <div className={styles.item2}>
                            <p className={styles.pnome}>Amora</p>

                            <div className={styles.infos}>
                                <ul>
                                    <li>Cachorro</li>
                                    <li>Fêmea</li>
                                    <li>Adulta</li>
                                </ul>
                            </div>
                            <div className={styles.infos}>
                                <p><img className={styles.endereco} src="/img/endereco.png" alt="" /> Pegar localização</p>
                            </div>
                            <button className={styles.botaoenviar} value="editar">Editar</button>
                            <button className={styles.botaoexcluir} value="editar">Excluir</button>
                            <p className={styles.amor}>Caracteristicas</p>
                            <ul>
                                <li>Docil e atentada</li>
                            </ul>

                            <p className={styles.amor}>Mais Detalhes(pegar temperamento)</p>
                            <ul>
                                <li>Docil</li>
                                <li>Rabugenta</li>
                                <li>Carente</li>
                                <li>Atentada</li>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.quadros}>

                    </div>

                </div>
                <Footer />
            </div>
        </>
    )
}
