import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { criarAnimal, getAnimal } from "../services/animal";
import styles from "../styles/components/FormMeusAnimais.module.css";
import Button from 'react-bootstrap';
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

    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                const vivencia = await getVivencia();
                console.log(temperamento);

                setTemperamentos(temperamento);
                setSociavel(sociavel);
                setVivencia(vivencia);

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

    return (
        <>
            <div >
                <Navbar />
                <div>
                    <div className={styles.amor}>
                        <h2 className={styles.h2}>Meus Animais</h2>
                    </div>

                    <body className={styles.body}>
                        <div className={styles.quadros}>

                            <div className={styles.item}>
                                <p>amiga, pensei em fazer aqui igual no checkbox de inserir animal, sabe? aquele if</p>
                                <img src="/img/colocar imagem.png" className={styles.imagem} alt="" />
                                <hr className={styles.hr} />
                                <p className={styles.pnome}><Link href="/meuanimal">PUXAR NOME DO BANCO</Link></p>
                            </div>
                            <div className={styles.item}>
                                <p>amiga, pensei em fazer aqui igual no checkbox de inserir animal, sabe? aquele if</p>
                                <img src="/img/colocar imagem.png" className={styles.imagem} alt="" />
                                <hr className={styles.hr} />
                                <p className={styles.pnome}><Link href="/meuanimal">PUXAR NOME DO BANCO</Link></p>
                            </div>
                            <div className={styles.item}>
                                <p>amiga, pensei em fazer aqui igual no checkbox de inserir animal, sabe? aquele if</p>
                                <img src="/img/colocar imagem.png" className={styles.imagem} alt="" />
                                <hr className={styles.hr} />
                                <p className={styles.pnome}><Link href="/meuanimal">PUXAR NOME DO BANCO</Link></p>
                            </div>
                            <div className={styles.item}>
                                <p>amiga, pensei em fazer aqui igual no checkbox de inserir animal, sabe? aquele if</p>
                                <img src="/img/colocar imagem.png" className={styles.imagem} alt="" />
                                <hr className={styles.hr} />
                                <p className={styles.pnome}><Link href="/meuanimal">PUXAR NOME DO BANCO</Link></p>
                            </div>
                            <div className={styles.item}>
                                <p>amiga, pensei em fazer aqui igual no checkbox de inserir animal, sabe? aquele if</p>
                                <img src="/img/colocar imagem.png" className={styles.imagem} alt="" />
                                <hr className={styles.hr} />
                                <p className={styles.pnome}><Link href="/meuanimal">PUXAR NOME DO BANCO</Link></p>
                            </div>
                            
                            
                        </div>
                    </body>
                </div>
                <Footer />
            </div>
        </>
    )
}