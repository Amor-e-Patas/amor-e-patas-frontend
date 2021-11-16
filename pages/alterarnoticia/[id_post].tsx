import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import { alterarPost, getPost } from "../../services/post";
import styles from "../../styles/components/FormAlterarNoticia.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../../components/verifyAuth";
import { criarImgPost, criarPost, getAssuntos } from "../../services/post";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import moment from 'moment';
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import { EditorProps } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
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

interface Post {
    id_post: number;
    titulo: string,
    corpo: string;
    autor: string,
    data: string,
    assuntos: Array<Assunto>,
    images: Array<{
        filepath: string;
    }>,
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
            id_post: context.params?.id_post
        },
    }
}


export default function AlterarPost({ id_post }: InferGetStaticPropsType<typeof getStaticProps>) {
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
                const post = await getPost(id_post) as Post;

                setAssuntos(assunto);
                setData(moment().format("YYYY-MM-DD"));
                setAutor(post.autor);
                setCorpo(post.corpo);
                setTitulo(post.titulo);
                setData(post.data);

                //console.log(post, 'possst');

                const assun = post.assuntos.map(assu => assu.id_assunto)

                const blocksFromHTML = convertFromHTML(post.corpo);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                
                setEditorState (EditorState.createWithContent(state));

                const selectedImagesPreview = Array<string>();
                for (const image of post.images) {
                    selectedImagesPreview.push(await obterImagem(image.filepath))
                }

                const imagesTemps = Array<File>();
                for (const image of post.images) {
                    imagesTemps.push(await obterImagemBlob(image.filepath))
                }
                setImages(imagesTemps)

                //console.log(selectedImagesPreview, 'imagens')

                setPreviewImages(selectedImagesPreview);
                const assuntoTemp= Array<Number>()
                for (const assunto of post.assuntos) {
                    assuntoTemp.push(assunto.id_assunto);
                }
                setSelectAssunto(assuntoTemp);

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


    async function eventoAlterarPost() {
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
            await
                alterarPost(id_post,
                    titulo,
                    stateToHTML(editorState.getCurrentContent()),
                    autor,
                    data,
                    selectAssunto)
            await
                criarImgPost(
                    images,
                    id_post
                )
            console.log(images, 'imagisss')
            alert("Notícia atualizada!");
            router.push(`/noticia/${id_post}`);
        } catch (error) {
            console.log(error);
            alert("Erro atualizar noticia.")
        }
    }
    return (
        <>
            <VerifyAuth />
            <div><Navbar />
                <body>
                    <form className={styles.form} name="form">
                        <div className={styles.container}>
                            <h3 className={styles.titulo}>Alterar Notícia</h3>
                            <div>
                                <label>
                                    <input type="text" name="name" className={styles.tituloNot} value={titulo} placeholder="Titulo" onChange={(e) => setTitulo(e.currentTarget.value)} />
                                </label>
                            </div>
                            <div>

                                <div>
                                    <div className={styles.containertemp}>
                                        <div className={styles.temperamento}>
                                            <div className={styles.temp}>
                                                <p className={styles.p}>Assunto</p>
                                                {
                                                    assuntos.map((assunto) =>
                                                        <div className={styles.temp}>
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
                                                                }} name="docil" checked={selectAssunto.some(assun => assun == assunto.id_assunto)}/>
                                                                {assunto.nome_ass}
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label className={styles.carac}>
                                    <Editor editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName={styles.caracteristica}
                                        editorClassName={styles.teste}
                                        onEditorStateChange={setEditorState} />
                                </label>

                                <div>
                                    <label>
                                        <input type="text" name="autor" className={styles.nome} placeholder="Autor" value={autor} onChange={(e) => setAutor(e.currentTarget.value)} />
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
                                    <br />
                                    <div className={styles.arquivos}>
                                        <label>
                                            {/*} <input multiple type="file" name="fotos" className={styles.fotos} placeholder="Referência:" />*/}
                                            { images.length < 1 ? <input onChange={handleSelectImages} type="file" id="image" /> : <></> }
                                        </label>
                                    </div>
                                </div>


                                <div className={styles.botoes}>
                                    <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                        e.preventDefault()
                                    }} />
                                    <input type="submit" className={styles.botaoenviar} value="Alterar" onClick={(e) => {
                                        e.preventDefault()
                                        eventoAlterarPost()
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
