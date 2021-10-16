import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import api from "../../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../styles/components/FormAnimalIndex.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../../services/temperamento";
import { getSociavel } from "../../services/sociavel";
import { getVivencia } from "../../services/vivencia";
import { deleteAnimal, getAnimalIndex } from "../../services/animal";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

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
    nome_ani: string,
    idade: string,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    nome_usu: string,
    tipo_porte: string,
    nome_esp: string,
    tipo_sexo: string,
    cidade: string,
    estado: string,
    telefone: string,
    images: Array<{
        filepath: string;
    }>,
    temperamentos: Array<{
        id_temperamento: number,
        descricao: string;
    }>;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext
) => {

    return {
        props: {
            id_animal: context.params?.id_animal
        },
    }
}

export default function Usuario({ id_animal }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [nome_ani, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [cor, setCor] = useState("");
    const [caracteristica_animal, setCaracteristica] = useState("");
    const [data_nasc, setData] = useState("");
    const [desaparecido, setDesaparecido] = useState("");
    const [id_porte, setPorte] = useState("");
    const [id_usuario, setUsuario] = useState("");
    const [nome_esp, setEspecie] = useState("");
    const [tipo_sexo, setSexo] = useState("");
    const router = useRouter();
    const [temperamentos, setTemperamentos] = useState(Array<Temp>());
    const [selectTemp, setSelectTemp] = useState(Array<Number>());
    const [sociaveis, setSociavel] = useState(Array<Soci>());
    const [selectSoci, setSelectSoci] = useState(Array<Number>());
    const [vivencias, setVivencia] = useState(Array<Vive>());
    const [selectVive, setSelectVive] = useState(Array<Number>());
    const [filepath, setImages] = useState<File[]>([]);
    const [previwImages, setPreviewImages] = useState<string[]>([]);
    const [animais, setAnimais] = useState<Animal>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalFoto, setMostrarModalFoto] = useState(false);
    const [image, setImage] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [nome_usu, setNomeUsu] = useState("");

    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                const vivencia = await getVivencia();
                const animais = await getAnimalIndex(id_animal);
                setAnimais(animais);
                setNome(animais.nome_ani);
                setEspecie(animais.nome_esp);
                setSexo(animais.tipo_sexo);
                setIdade(animais.idade);
                setCidade(animais.cidade);
                setEstado(animais.estado);
                setNomeUsu(animais.nome_usu);
                setTelefone(animais.num_telefone);
                setCaracteristica(animais.caracteristica_animal);

                setTemperamentos(animais.temperamentos);

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
                    <p onClick={() => router.back()} className="pointer"> Voltar</p>
                    <div className={styles.quadros}>
                        <div className={styles.item}>
                            <div className={styles.item}>
                                <img src={`http://localhost:3333/${animais?.images[0].filepath}`} className={styles.imagem} alt="" />
                            </div>

                            <div>
                                <tr>
                            {
                                    animais?.images.map((image) =>
                                    <td>
                                    <img src={`http://localhost:3333/${image.filepath}`} className={styles.imagem2} 
                                    onClick={(e) => {e.preventDefault()
                                                    setImage(`http://localhost:3333/${image.filepath}`)
                                                    setMostrarModalFoto(true)}}/>             
                                    </td>
                                    )
                                } 
                            </tr>
                            </div>
                        </div>

                        <div className={styles.modalFoto} style={{ display: mostrarModalFoto ? "block" : "none" }}>
                                
                                    <div>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                setMostrarModalFoto(false);
                                            }}> X</button>
                                            </div>
                                            <img src={image} className={styles.imagemodal} />
                                        
                                
                            </div>

                        <div className={styles.item}>
                            <p className={styles.pnome}> {nome_ani}</p>

                            <div className={styles.infos}>
                                <ul>
                                    <li>{nome_esp}</li>
                                    <li>{tipo_sexo}</li>
                                    <li>{idade}</li>
                                </ul>
                            </div>
                            <div className={styles.infos}>
                                <div className={styles.item}>
                                    <img src="/img/endereco.png" className={styles.endereco} alt="" /> Localizado em {animais?.cidade + ", " + estado}
                                </div>
                                <br />
                            </div>
                            <button className={styles.botaoenviar} value="editar" onClick={() => {
                                setMostrarModal(true);}}>
                                Quero Adotar</button>

                            <div className={styles.modal} style={{ display: mostrarModal ? "block" : "none" }}>
                            <div>
                                            <button className={styles.x} onClick={(e) => {
                                                e.preventDefault()
                                                setMostrarModal(false);
                                            }}> X</button>
                                        </div>
                                <p className={styles.pnome2}>Dados Anunciante</p>
                                    <div className={styles.botoes2}>
                                        
                                        <div>
                                            <p className={styles.dados}>{nome_usu}</p>
                                            <p className={styles.dados}>{telefone}</p>
                                            <p className={styles.dados}>{cidade}, {estado}</p>
                                            
                                        </div>
                                    </div>
                                
                            </div>
                            

                            <p className={styles.amor}>Caracteristicas</p>
                            <ul>
                                <li>{caracteristica_animal}</li>
                            </ul>

                            <p className={styles.amor}>Mais Detalhes</p>
                            <ul>
                                {
                                    temperamentos.map((temperamento) =>
                                        <li>{temperamento.descricao}</li>
                                    )
                                }
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