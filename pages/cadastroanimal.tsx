import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { criarAnimal, getAnimal } from "../services/animal";
import styles from "../styles/components/FormAnimal.module.css";
import Button from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel"

interface Temp {
    id_temperamento: number,
    descricao: string
}

interface Soci {
    id_sociavel: number,
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
    const [images, setImages] = useState<File[]>([]);
    const [previwImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                console.log(temperamento);

                setTemperamentos(temperamento);
                setSociavel(sociavel);

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

        /*if (!valida_CPF(cpf)) {
            alert("CPF INVALIDO");
            return;
        }
        if (!valida_email(email)) {
            alert("Email invalido!");
            return;
        }

        if (nome == "") {
            alert("Preencha o nome.");
            return;
        }

        if (cpf == "") {
            alert("Preencha a data de nascimento.");
            return;
        }

        if (datanasc == "") {
            alert("Preencha a data de nascimento.");
            return;
        }

        if (email == "") {
            alert("Preencha o email.");
            return;
        }

        if (senha == "") {
            alert("Preencha a senha.");
            return;
        }

        if (bairro == "") {
            alert("Preencha o bairro.");
            return;
        }

        if (cep == "") {
            alert("Preencha o CEP.");
            return;
        }

        let confirsenha = (document.getElementById("confirsenha") as HTMLInputElement).value;

        if (senha != confirsenha) {
            alert("Senhas não são iguais. Verifique novamente.");
            return;
        }

        let termos = (document.getElementById("termos") as HTMLInputElement).checked;

        if (termos == false) {
            alert("É preciso aceitar os termos.");
            return;
        }

        let vendas = (document.getElementById("vendas") as HTMLInputElement).checked;

        if (vendas == false) {
            alert("É preciso concordar com a política de não venda de animais.");
            return;
        }*/


        try {
            await
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
                    selectSoci)
            alert("Animal criado ;)");
            router.push("/cadastroanimal");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar animal.")
        }

    }

    return (
        <div><Navbar />
            <body>
                <form className={styles.form} name="form">
                    <div className={styles.container}>
                        <h3 className={styles.titulo}>Cadastro de Animal</h3>
                        <div>
                            <label>
                                <input type="text" name="name" className={styles.nome} placeholder="Nome" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                            <label>
                                <input type="text" className={styles.idade} placeholder="Idade" onChange={(e) => setIdade(e.currentTarget.value)}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                <select name="genero" id="genero" className={styles.genero} onChange={(e) => setSexo(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o sexo</option>
                                    <option value="1">Fêmea</option>
                                    <option value="2">Macho</option>
                                </select>
                            </label>
                            <label>
                                <input type="date" name="datanasc" className={styles.data} placeholder="Data de nascimento" onChange={(e) => setData(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="text" name="especie" className={styles.especie} placeholder="Especie" onChange={(e) => setEspecie(e.currentTarget.value)} />
                            </label>
                            <label>
                                <select name="porte" id="porte" className={styles.porte} onChange={(e) => setPorte(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o porte</option>
                                    <option value="1">Pequeno</option>
                                    <option value="2">Médio</option>
                                    <option value="3">Grande</option>
                                </select>
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="text" className={styles.cor} placeholder="Cor" name="confirsenha" id="confirsenha" onChange={(e) => setCor(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <textarea name="caracteristica" className={styles.caracteristica} placeholder="Característica animal" onChange={(e) => setCaracteristica(e.currentTarget.value)}></textarea>
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
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Casa com quintal
                                        </label>
                                    </div>
                                    <div className={styles.temp}>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Apartamento
                                        </label>
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
                                <label>
                                    {/*} <input multiple type="file" name="fotos" className={styles.fotos} placeholder="Referência:" />*/}
                                    <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                                </label>
                            </div>


                            <div className={styles.chec}>
                                <label>
                                    <input type="checkbox" id="termos" name="termos" />
                                    Li e aceito os termos
                                </label>
                            </div>

                            <div className={styles.chec2}>
                                <label>
                                    <input type="checkbox" id="vendas" name="vendas" />
                                    Não permitimos a venda de animais através do site.
                                </label>
                            </div>


                            <div className={styles.botoes}>
                                <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                    e.preventDefault()
                                }} />
                                <input type="submit" className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                                    e.preventDefault()
                                    eventoCriarAnimal()
                                }} />
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
