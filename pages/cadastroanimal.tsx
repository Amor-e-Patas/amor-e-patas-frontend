import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import { criarAnimal } from "../services/animal";
import styles from "../styles/components/FormAnimal.module.css";
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel";
import { getVivencia } from "../services/vivencia";
import { criarImgAnimal } from "../services/img_animal";
import VerifyAuth from "../components/verifyAuth";

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
    const [previewImages, setPreviewImages] = useState<string[]>([]);

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


    function removerImagem(index: number) {
        const imagesTemp = [...images.slice(0, index), ...images.slice(index + 1, images.length)]
        const imagesPreviewTemp = [...previewImages.slice(0, index), ...previewImages.slice(index + 1, previewImages.length)]

        setImages(imagesTemp);
        setPreviewImages(imagesPreviewTemp);

    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        };

        const selectedImages = Array.from(event.target.files);
        const imagesTemp = [...images, ...selectedImages];

        setImages(imagesTemp);
        const selectedImagesPreview = [...previewImages];
        for (const image of selectedImages) {
            selectedImagesPreview.push(URL.createObjectURL(image))
        }
        //console.log(selectedImagesPreview, 'imagens')

        setPreviewImages(selectedImagesPreview);
        //const selectedImagesPreview = selectedImages.map(image => {
        //    return URL.createObjectURL(image);
        //});

        setPreviewImages(selectedImagesPreview);
    }

    async function eventoCriarAnimal() {
        if (nome_ani == "") {
            alert("Preencha o nome do animal.");
            return;
        }

        if (id_sexo == "") {
            alert("Selecione o sexo.");
            return;
        }

        if (id_especie == "") {
            alert("Selecione a espécie.");
            return;
        }

        if (id_porte == "") {
            alert("Selecione o porte.");
            return;
        }

        if (desaparecido == "") {
            alert("Informe se o animal está desaparecido.");
            return;
        }

        let imagens = (document.getElementById("image[]") as HTMLInputElement).value;

        if (imagens == "") {
            alert("Selecione uma ou mais imagens.");
            return;
        }


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
                    parseInt(id_status),
                    selectTemp,
                    selectSoci,
                    selectVive)
            await
                criarImgAnimal(
                    images,
                    id_animal
                )
            alert("Animal cadastrado com sucesso e aguardando análise.");
            router.push("/animaisanalise");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar animal.")
        }

    }

    return (
        <>
            <VerifyAuth />
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
                                    <select name="especie" id="especie" className={styles.especie} onChange={(e) => setEspecie(e.currentTarget.value)}>
                                        <option value="" selected>Selecione a espécie</option>
                                        <option value="1">Gato</option>
                                        <option value="2">Cachorro</option>
                                    </select>
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

                            <div>
                                <label>
                                    <input type="text" className={styles.cor} placeholder="Cor" name="confirsenha" id="confirsenha" onChange={(e) => setCor(e.currentTarget.value)} />
                                </label>
                                <label>
                                    <select name="desaparecido" id="desaparecido" className={styles.desapa} onChange={(e) => setDesaparecido(e.currentTarget.value)}>
                                        <option value="" selected>Este animal está desaparecido?</option>
                                        <option value="N" >Não</option>
                                        <option value="S">Sim</option>
                                    </select>
                                </label>
                            </div>

                            <div>

                                <div className={styles.mae}>
                                    <label className={styles.carac}>
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
                                </div>


                                <div>
                                    <div className={styles.imagesContainer}>
                                        {previewImages.map((image, index) => {
                                            return (
                                                <>
                                                    <div className={styles.divfoto}>
                                                        <div>
                                                            <div>
                                                                <img key={image} src={image} />
                                                            </div>

                                                            <button className={styles.remover} onClick={(e) => {
                                                                (e).preventDefault();
                                                                removerImagem(index);
                                                            }}>Remover</button>
                                                        </div>
                                                    </div>
                                                </>
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
                                        e.preventDefault();
                                        router.back();
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
        </>
    )

}
