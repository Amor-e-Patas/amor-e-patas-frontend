import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../styles/components/FormAnimal.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../../components/verifyAuth";
import { criarImgPost, criarPost, getAssuntos, getPost } from "../../services/post";
import moment from 'moment';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

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
    assuntos: Array<{
        id_assunto: string;
        nome_ass: string;
    }>,
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

export default function Usuario({ id_post }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [titulo, setTitulo] = useState("");
    const [corpo, setCorpo] = useState("");
    const [autor, setAutor] = useState("");
    const [data, setData] = useState("");
    const router = useRouter();
    const [assuntos, setAssuntos] = useState(Array<Assunto>());
    const [selectAssunto, setSelectAssunto] = useState(Array<Number>());
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [post, setPosts] = useState<Post>();

    useEffect(() => {
        async function fetchAPI() {
            try {
               // const assunto = await getAssuntos();
                //setAssuntos(assunto);
                const post = await getPost(id_post);
                setPosts(post);
                setAutor(post.autor);
                setTitulo(post.titulo);
                setCorpo(post.corpo);
                setData(post.data);
                console.log(post,'noticiaaa');

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    async function eventoCriarPost() {
    }
    return (
        <>
            <VerifyAuth />
            <div><Navbar />
                <body>
                    <form className={styles.form} name="form">
                        <div className={styles.container}>
                            <h3 className={styles.titulo}>Notícia</h3>
                            <div>

                                <div className={styles.mae}>
                                    <div className={styles.containertemp}>
                                        <div className={styles.temperamento}>
                                            <div className={styles.temp}>
                                                <div>
                                                    <p> Titulo: {titulo}</p>
                                                    <p> Autor: {autor}</p>
                                                    <p> Data: {data}</p>
                                                    
                                                    <div dangerouslySetInnerHTML={ { __html: corpo}} >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div>
                                    

                                    <div className={styles.imagesContainer}>
                                <img src={`http://localhost:3333/${post?.images[0].filepath}`} className={styles.imagem} alt="" />
                            </div>
                                </div>


                                <div className={styles.botoes}>
                                    <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                        e.preventDefault()
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
