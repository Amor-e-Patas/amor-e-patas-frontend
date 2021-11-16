import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import api from "../../services/services";
import React, { useState, useEffect, ChangeEvent } from "react";
import { alterarAnimal, getAnimal } from "../../services/animal";
import styles from "../../styles/components/FormAnimal.module.css";
import { useRouter } from "next/router";
import { getTemperamento } from "../../services/temperamento";
import { getSociavel } from "../../services/sociavel";
import { getVivencia } from "../../services/vivencia";
import { criarImgAnimal } from "../../services/img_animal";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
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
    id_animal: number,
    cor: string,
    caracteristica_animal: string,
    data_nasc: string,
    desaparecido: string,
    id_usuario: number,
    id_porte: number,
    id_especie: number,
    id_sexo: number,
    images: Array<{
        filepath: string;
    }>,
    temperamentos: Array<Temp>,
    sociaveis: Array<Soci>,
    vivencias: Array<Vive>;

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

export default function AlterarAnimal({ id_animal }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [nome_ani, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [cor, setCor] = useState("");
    const [caracteristica_animal, setCaracteristica] = useState("");
    const [data_nasc, setData] = useState("");
    const [desaparecido, setDesaparecido] = useState("");
    const [id_porte, setPorte] = useState(0);
    const [id_usuario, setUsuario] = useState("");
    const [id_especie, setEspecie] = useState(0);
    const [id_sexo, setSexo] = useState(0);
    const router = useRouter();
    const [temperamentos, setTemperamentos] = useState(Array<Temp>());
    const [selectTemp, setSelectTemp] = useState(Array<number>());
    const [selectSocis, setSelectSocis] = useState(Array<number>());
    const [selectVives, setSelectVives] = useState(Array<number>());
    const [sociaveis, setSociavel] = useState(Array<Soci>());
    const [vivencias, setVivencia] = useState(Array<Vive>());
    const [selectVive, setSelectVive] = useState(Array<number>());
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [animais, setAnimais] = useState({} as Animal);
    const [anitemps, setAniTemps] = useState(Array<Temp>());
    const [anisocis, setAniSoci] = useState(Array<Soci>());
    const [anivives, setAniVive] = useState(Array<Vive>());


    useEffect(() => {
        async function fetchAPI() {
            try {
                const temperamento = await getTemperamento();
                const sociavel = await getSociavel();
                const vivencia = await getVivencia();
                const animaisTemp = await getAnimal(id_animal) as Animal;


                setAnimais(animaisTemp);
                setSociavel(sociavel);
                setVivencia(vivencia);
                setTemperamentos(temperamento);
                setNome(animaisTemp.nome_ani);
                setIdade(animaisTemp.idade);
                setSexo(animaisTemp.id_sexo);
                setEspecie(animaisTemp.id_especie);
                var str = animaisTemp.data_nasc;
                var date = moment(str);
                var dateComponent = date.utc().format('YYYY-MM-DD');
                setData(dateComponent);
                setPorte(animaisTemp.id_porte);
                setCor(animaisTemp.cor);
                setCaracteristica(animaisTemp.caracteristica_animal);
                setDesaparecido(animaisTemp.desaparecido);
                setAniTemps(animaisTemp.temperamentos);
                setAniSoci(animaisTemp.sociaveis);
                setAniVive(animaisTemp.vivencias)
                console.log(animaisTemp, 'AnimaisTemp')
                const temperam = animaisTemp.temperamentos.map(temp => temp.id_temperamento)
                const socis = animaisTemp.sociaveis.map(soci => soci.id_sociavel)
                const vives = animaisTemp.vivencias.map(vive => vive.id_vivencia)

                console.log(temperam, socis, vives, 'caract')
                setSelectTemp(temperam);
                setSelectSocis(socis);
                setSelectVives(vives);
                const contemIdIgualAUm = temperamentos.some(temperamento => temperamento.id_temperamento == 80)

                const selectedImagesPreview = Array<string>();
                for (const image of animaisTemp.images) {
                    selectedImagesPreview.push(await obterImagem(image.filepath))
                }

                const imagesTemps = Array<File>();
                for (const image of animaisTemp.images) {
                    imagesTemps.push(await obterImagemBlob(image.filepath))
                }
                setImages(imagesTemps)

                //console.log(selectedImagesPreview, 'imagens')

                setPreviewImages(selectedImagesPreview);

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    async function obterImagem(image: string): Promise<string> {
        const objectURL = await fetch(`http://localhost:3333/${image}`).then(function (response) {
            return response.blob();
        })
        //return URL.createObjectURL(objectURL);
        return new Promise((resolve, reject) => {
            resolve(URL.createObjectURL(objectURL));
        });
    }

    async function obterImagemBlob(image: string): Promise<File> {
        const objectBlob = await fetch(`http://localhost:3333/${image}`).then(function (response) {
            return response.blob();
        })
        //return URL.createObjectURL(objectURL);
        return new Promise((resolve, reject) => {
            resolve((objectBlob) as File);
        });
    }

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

    async function eventoAlterarAnimal() {
        if (nome_ani == "") {
            alert("Preencha o nome do animal.");
            return;
        }

        if (id_sexo == 0) {
            alert("Selecione o sexo.");
            return;
        }

        if (id_especie == 0) {
            alert("Selecione a espécie.");
            return;
        }

        if (id_porte == 0) {
            alert("Selecione o porte.");
            return;
        }

        if (desaparecido == "") {
            alert("Informe se o animal está desaparecido.");
            return;
        }

        if (images.length === 0) {
            alert("Selecione uma ou mais imagens.");
            return;
        }

        if (images.length >= 5){
            alert("Selecione no máximo 5 imagens.");
            return;
        }

        try {
            await
                alterarAnimal(nome_ani,
                    idade,
                    id_animal,
                    cor,
                    caracteristica_animal,
                    data_nasc,
                    desaparecido,
                    parseInt(id_usuario),
                    id_porte,
                    id_especie,
                    id_sexo,
                    selectTemp,
                    selectSocis,
                    selectVives)
            await
                criarImgAnimal(
                    images,
                    id_animal
                )
            console.log(images, 'imagisss')
            alert("Animal atualizado ;)");
            router.push(`/meuanimal/${id_animal}`);
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
                                <select name="genero" id="genero" value={id_sexo} className={styles.genero} onChange={(e) => setSexo(parseInt(e.currentTarget.value))}>
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
                                <select name="especie" id="especie" className={styles.especie} value={id_especie} onChange={(e) => setEspecie(parseInt(e.currentTarget.value))}>
                                    <option value="" selected>Selecione a espécie</option>
                                    <option value="1">Gato</option>
                                    <option value="2">Cachorro</option>
                                </select>
                            </label>
                            <label>
                                <select name="porte" id="porte" className={styles.porte} value={id_porte} onChange={(e) => setPorte(parseInt(e.currentTarget.value))}>
                                    <option value="" selected>Selecione o porte</option>
                                    <option value="1">Pequeno</option>
                                    <option value="2">Médio</option>
                                    <option value="3">Grande</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="text" className={styles.cor} value={cor} placeholder="Cor" name="confirsenha" id="confirsenha" onChange={(e) => setCor(e.currentTarget.value)} />
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
                                                            }} name="docil" checked={selectTemp.some(temps => temps == temperamento.id_temperamento)} />

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
                                                                    const aux = [...selectSocis]
                                                                    aux.push(parseInt(e.target.value))
                                                                    setSelectSocis(aux);
                                                                    console.log(selectSocis);
                                                                } else {
                                                                    const aux = [...selectSocis.filter(item => item != parseInt(e.target.value))]
                                                                    setSelectSocis(aux);
                                                                    console.log(selectSocis);
                                                                }
                                                            }} name="sociavel" checked={selectSocis.some(socis => socis == sociavel.id_sociavel)} />
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
                                                                    const aux = [...selectVives]
                                                                    aux.push(parseInt(e.target.value))
                                                                    setSelectVive(aux);
                                                                    console.log(selectVives);
                                                                } else {
                                                                    const aux = [...selectVives.filter(item => item != parseInt(e.target.value))]
                                                                    setSelectVive(aux);
                                                                    console.log(selectVives);
                                                                }
                                                            }} name="sociavel" checked={selectVives.some(vives => vives == vivencia.id_vivencia)} />
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
                            </div>
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
                                    {!(images.length >= 5) ? <input multiple onChange={handleSelectImages} type="file" id="image[]" /> : <></>}
                                </label>
                            </div>
                            <div className={styles.botoes}>
                                <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                    e.preventDefault();
                                    router.back();
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
