import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/components/FormCadastrarNoticia.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../components/verifyAuth";
import VerifyAdm from "../components/VerifyAdm";
import { criarImgPost, criarPost, getAssuntos } from "../services/post";
import moment from 'moment';
//import { Editor, EditorState } from 'draft-js';
//import 'draft-js/dist/Draft.css';
import { EditorState } from "draft-js";
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import { EditorProps } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html';
//import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  )
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic'; // (if using Next.js or use own dynamic loader)

interface Assunto {
    id_assunto: number,
    nome_ass: string
}

export default function Usuario() {
    const [titulo, setTitulo] = useState("");
    const [corpo, setCorpo] = useState("");
    const [autor, setAutor] = useState("");
    const [data, setData] = useState("");
    const router = useRouter();
    const [assuntos, setAssuntos] = useState(Array<Assunto>());
    const [selectAssunto, setSelectAssunto] = useState(Array<Number>());
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const staticToolbarPlugin = createToolbarPlugin();
    const { Toolbar } = staticToolbarPlugin;

    useEffect(() => {
        async function fetchAPI() {
            try {
                const assunto = await getAssuntos();
                setAssuntos(assunto);
                setData(moment().format("YYYY-MM-DD"));

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

        setPreviewImages(selectedImagesPreview);
        setPreviewImages(selectedImagesPreview);
    }


    async function eventoCriarPost() {
        if (titulo == "") {
            alert("Preencha o título.");
            return;
        }

        if (autor == "") {
            alert("Preencha o autor.");
            return;
        }

        if (images.length != 1) {
            alert("Selecione uma imagem");
            return;
        }


        try {
            const id_post = await
                criarPost(titulo,
                    stateToHTML(editorState.getCurrentContent()),
                    autor,
                    data,
                    selectAssunto)
            await
                criarImgPost(
                    images,
                    id_post
                )
            alert("Post criado ;)");
            router.push("/noticia/"+id_post);
        } catch (error) {
            console.log(error);
            alert("Erro ao criar post.")
        }

    }


    return (
        <>
            <VerifyAdm />
            <div><Navbar />
                <body>
                    <form className={styles.form} name="form">
                        <div className={styles.container}>
                            <h3 className={styles.titulo}>Cadastro de Notícia</h3>
                            <div>
                                <label>
                                    <input type="text" name="name" className={styles.tituloNot} placeholder="Titulo" onChange={(e) => setTitulo(e.currentTarget.value)} />
                                </label>
                            </div>
                            <div>

                                <div>
                                    <div className={styles.containertemp}>
                                        <div className={styles.temperamento}>
                                            <div className={styles.temp}>
                                                <p className={styles.p}>Assunto</p>
                                                {
                                                    assuntos.map((assunto, index) =>
                                                        <div className={styles.temp} key={index}>
                                                            <label>
                                                                <input type="checkbox" id="docil" value={assunto.id_assunto} onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        const aux = [...selectAssunto]
                                                                        aux.push(parseInt(e.target.value))
                                                                        setSelectAssunto(aux);
                                                                        console.log(selectAssunto);
                                                                    } else {
                                                                        const aux = [...selectAssunto.filter(item => item != parseInt(e.target.value))]
                                                                        setSelectAssunto(aux);
                                                                        console.log(selectAssunto);
                                                                    }
                                                                }} name="docil" />
                                                                {assunto.nome_ass}
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label className={styles.carac} >
                                    <Editor editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName={styles.caracteristica}
                                        editorClassName={styles.teste}
                                        onEditorStateChange={setEditorState} />

                                {/*<textarea name="caracteristica" className={styles.caracteristica} placeholder="Corpo" onChange={(e) => setCorpo(e.currentTarget.value)}></textarea>*/}
                                </label>

                                <div>
                                    <label>
                                        <input type="text" name="autor" className={styles.nome} placeholder="Autor" onChange={(e) => setAutor(e.currentTarget.value)} />
                                    </label>
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
                                            { images.length < 1 ? <input onChange={handleSelectImages} type="file" id="image" /> : <></> }
                                        </label>
                                    </div>
                                </div>


                                <div className={styles.botoes}>
                                    <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                        e.preventDefault();
                                        router.back();
                                    }} />
                                    <input type="submit" className={styles.botaoenviar} value="Postar" onClick={(e) => {
                                        e.preventDefault()
                                        eventoCriarPost()
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
