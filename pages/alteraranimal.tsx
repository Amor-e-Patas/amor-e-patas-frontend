import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { alterarAnimal, getAnimal } from "../services/animal";
import styles from "../styles/components/FormAnimal.module.css";
import Button from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel";
import { getVivencia } from "../services/vivencia";
import { criarImgAnimal } from "../services/img_animal";
import moment from "moment";

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
    id_sexo: number
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
                const animais = await getAnimal();

                setNome(animais.nome_ani);
                setIdade(animais.idade);
                setSexo(animais.id_sexo);
                setEspecie(animais.id_especie);
                var str = animais.data_nasc;
                var date = moment(str);
                var dateComponent = date.utc().format('YYYY-MM-DD');
                setData(dateComponent);
                setPorte(animais.id_porte);
                setCor(animais.cor);
                setCaracteristica(animais.caracteristica_animal);

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

    async function eventoAlterarAnimal() {

        try {
            const id_animal = await
                alterarAnimal(nome_ani,
                    idade,
                    cor,
                    caracteristica_animal,
                    data_nasc,
                    desaparecido,
                    parseInt(id_usuario),
                    parseInt(id_porte),
                    parseInt(id_especie),
                    parseInt(id_sexo)/*,
                    selectTemp,
                    selectSoci,
                    selectVive*/)
            /* await
                 criarImgAnimal(
                     images,
                     id_animal
                 )*/
            alert("Animal atualizado ;)");
            router.push("/alteraranimal");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar atualizar animal.")
        }

    }

    return (
        <div><Navbar />
            <body>
                <form className={styles.form} name="form">
                    <div className={styles.container}>
                        <h3 className={styles.titulo}>Atualizar Cadastro de Animal</h3>
                        <div>
                            <label>
                                <input type="text" name="name" className={styles.nome} value={nome_ani} placeholder="Nome" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                            <label>
                                <input type="text" className={styles.idade} value={idade} placeholder="Idade" onChange={(e) => setIdade(e.currentTarget.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                <select name="genero" id="genero" value={id_sexo} className={styles.genero} onChange={(e) => setSexo(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o sexo</option>
                                    <option value="1">Fêmea</option>
                                    <option value="2">Macho</option>
                                </select>
                            </label>
                            <label>
                                <input type="date" name="datanasc" className={styles.data} value={data_nasc} placeholder="Data de nascimento" onChange={(e) => setData(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>
                                <select name="especie" id="especie" className={styles.especie} value={id_especie} onChange={(e) => setEspecie(e.currentTarget.value)}>
                                    <option value="" selected>Selecione a espécie</option>
                                    <option value="1">Gato</option>
                                    <option value="2">Cachorro</option>
                                </select>
                            </label>
                            <label>
                                <select name="porte" id="porte" className={styles.porte} value={id_porte} onChange={(e) => setPorte(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o porte</option>
                                    <option value="1">Pequeno</option>
                                    <option value="2">Médio</option>
                                    <option value="3">Grande</option>
                                </select>
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="text" className={styles.cor} placeholder="Cor" value={cor} name="confirsenha" id="confirsenha" onChange={(e) => setCor(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <textarea name="caracteristica" className={styles.caracteristica} value={caracteristica_animal} placeholder="Característica animal" onChange={(e) => setCaracteristica(e.currentTarget.value)}></textarea>
                            </label>
                            <div className={styles.containertemp}>
                                <div className={styles.temperamento}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Temperamento</p>
                                        {
                                            temperamentos.map((temperamento) =>
                                                <div className={styles.temp}>
                                                    <label>
                                                        <input type="checkbox" id="docil" value={temperamento.id_temperamento} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                const aux = [...selectTemp]
                                                                aux.push(parseInt(e.target.value))
                                                                setSelectTemp(aux);
                                                                console.log(selectTemp);
                                                            } else {
                                                                const aux = [...selectTemp.filter(item => item != parseInt(e.target.value))]
                                                                setSelectTemp(aux);
                                                                console.log(selectTemp);
                                                            }
                                                        }} name="docil" />
                                                        {temperamento.descricao}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.sociavel}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Sociável com</p>
                                        {
                                            sociaveis.map((sociavel) =>
                                                <div className={styles.temp}>
                                                    <label>
                                                        <input type="checkbox" id="docil" value={sociavel.id_sociavel} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                const aux = [...selectSoci]
                                                                aux.push(parseInt(e.target.value))
                                                                setSelectSoci(aux);
                                                                console.log(selectSoci);
                                                            } else {
                                                                const aux = [...selectSoci.filter(item => item != parseInt(e.target.value))]
                                                                setSelectSoci(aux);
                                                                console.log(selectSoci);
                                                            }
                                                        }} name="sociavel" />
                                                        {sociavel.descricao}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.vive}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Vive bem em</p>
                                        {
                                            vivencias.map((vivencia) =>
                                                <div className={styles.temp}>
                                                    <label>
                                                        <input type="checkbox" id="casa" value={vivencia.id_vivencia} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                const aux = [...selectVive]
                                                                aux.push(parseInt(e.target.value))
                                                                setSelectVive(aux);
                                                                console.log(selectVive);
                                                            } else {
                                                                const aux = [...selectVive.filter(item => item != parseInt(e.target.value))]
                                                                setSelectVive(aux);
                                                                console.log(selectVive);
                                                            }
                                                        }} name="vivencia" />
                                                        {vivencia.descricao}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.imagesContainer}>
                                    {previwImages.map(image => {
                                        return (
                                            <img key={image} src={image} />
                                        );
                                    })}
                                </div>
                                <div className={styles.arquivos}>
                                    <label>
                                        {/*} <input multiple type="file" name="fotos" className={styles.fotos} placeholder="Referência:" />*/}
                                        <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                                    </label>
                                </div>
                            </div>




                            <div className={styles.botoes}>
                                <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                    e.preventDefault()
                                }} />

                                <button className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                                    (e).preventDefault();
                                    eventoAlterarAnimal();
                                }}>Atualizar</button>


                            </div>
                        </div>
                    </div>
                </form>
            </body>

            <div>
                <Footer />
            </div>
        </div>

    )

}
