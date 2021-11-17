import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import api from "../../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../styles/components/FormMeuAnimal.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../../services/temperamento";
import { getSociavel } from "../../services/sociavel";
import { getVivencia } from "../../services/vivencia";
import { getAnimal, deleteAnimal } from "../../services/animal";
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
    num_telefone: string,
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
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [image, setImage] = useState("")

    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                const vivencia = await getVivencia();
                const animais = await getAnimal(id_animal);
                console.log(animais);
                setAnimais(animais);
                setNome(animais.nome_ani);
                setEspecie(animais.nome_esp);
                setSexo(animais.tipo_sexo);
                setIdade(animais.idade);
                setCaracteristica(animais.caracteristica_animal);
                setCidade(animais.cidade);
                setEstado(animais.estado);
                setTelefone(animais.num_telefone);


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
                                    animais?.images.map((image, index) =>
                                    <td key={index}>
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
                                    <img src="/img/endereco.png" className={styles.endereco} alt="" /> Localizado em {cidade + ", " + estado}
                                </div>
                                <br />
                            </div>
                            <Link href={`/alteraranimal/${id_animal}`}><button className={styles.botaoenviar} value="editar">Editar</button></Link>

                            <div className={styles.modal} style={{ display: mostrarModal ? "block" : "none" }}>
                                <p>Deseja realmente excluir o animal?
                                    <div className={styles.botoes}>
                                        <div>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                deleteAnimal(id_animal)
                                                router.push(desaparecido=="S"?`/meusanimais`:`/desaparecidos`);
                                            }}> Sim</button>
                                        </div>
                                        <div>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                setMostrarModal(false);
                                            }}> Não</button>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <button className={styles.botaoexcluir} value="excluir" onClick={(e) => {
                                e.preventDefault()
                                setMostrarModal(true);
                            }}>Excluir</button>

                            <p className={styles.amor}>Caracteristicas</p>
                            <ul>
                                <li>{caracteristica_animal}</li>
                            </ul>

                            <p className={styles.amor}>Mais Detalhes</p>
                            <ul>
                                {
                                    temperamentos.map((temperamento, index) =>
                                        <li key={index}>{temperamento.descricao}</li>
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