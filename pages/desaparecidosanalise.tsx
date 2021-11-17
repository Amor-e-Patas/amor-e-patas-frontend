import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { criarAnimal, getAnimaisDesaparecidosAnalise } from "../services/animal";
import styles from "../styles/components/FormMeusAnimais.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel";
import { getVivencia } from "../services/vivencia";
import { criarImgAnimal } from "../services/img_animal";

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
    id_animal: number,
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
    const [desaparecido, setDesaparecido] = useState("");
    const [id_porte, setPorte] = useState("");
    const [id_usuario, setUsuario] = useState("");
    const [id_especie, setEspecie] = useState("");
    const [id_sexo, setSexo] = useState("");
    const [id_status, setStatus] = useState("3");
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
                const animais = await getAnimaisDesaparecidosAnalise();
                console.log(animais,'teste');

                //setTemperamentos(temperamento);
                //setSociavel(sociavel);
                //setVivencia(vivencia);
                setAnimais(animais);
                console.log(animais);

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

    return (
        <>
            <div >
                <Navbar />
                <div>
                    <div className={styles.titulos}>
                        <div className={styles.amor}>
                            <h2>Animais desaparecidos em análise</h2>
                        </div>
                        <div>
                        <Link href="/cadastroanimal"><img src="/img/cadastraranimal.png" className={styles.imagemcadastrar} alt="Cadastrar"/></Link>
                        </div>
                    </div>

                    <body className={styles.body}>
                        <div className={styles.quadros}>
                            {
                                animais.map((animal, index) =>
                                    <div className={styles.item} key={index}>
                                        <p></p>
                                        <img src={`http://localhost:3333/${animal.images[0].filepath}`} className={styles.imagem} alt="" />
                                        <hr className={styles.hr} />
                                        <p className={styles.pnome}><Link href={`/meuanimal/${animal.id_animal}`} >{animal.nome_ani}</Link></p>
                                    </div>

                                )
                            }

                        </div>
                    </body>
                </div>
                <Footer />
            </div>
        </>
    )
}
