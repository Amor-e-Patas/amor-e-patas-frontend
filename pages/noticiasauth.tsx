import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/components/FormNoticiasAuth.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../components/verifyAuth";
import { criarImgPost, deletePost, getAssuntos, getPosts } from "../services/post";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import moment from 'moment';
import Link from "next/link";

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
    const [posts, setPosts] = useState(Array<Post>());
    const [mostrarModal, setMostrarModal] = useState(false);
    const [id_post, setIdpost] = useState(0);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const assunto = await getAssuntos();
                setAssuntos(assunto);

                const post = await getPosts();
                setPosts(post);
                console.log(post);

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    async function eventoExcluirPost(id_post: number) {
        try {
            await deletePost(id_post)
            const post = await getPosts();
                setPosts(post);
        } catch (err) {
            console.log(err);

        }
    }
    return (
        <>
            <VerifyAuth />
            <div><Navbar /></div>
            <body>
                <form className={styles.form} name="form">
                    <div className={styles.container}>
                        <h3 className={styles.titulo}>Blog</h3>
                        <div>

                            <div className={styles.mae}>
                                <div className={styles.containertemp}>
                                    <div className={styles.temperamento}>
                                        <div className={styles.temp}>
                                            <div>
                                                {
                                                    posts.map((post, index) =>
                                                        <div className={styles.noticias} key={index}>
                                                            <div className={styles.imagesContainer}>
                                                                <img src={`http://localhost:3333/${post.images[0].filepath}`} className={styles.imagem} alt="" />
                                                                <hr />
                                                            </div>
                                                            <div>
                                                                <p><Link href={`/noticia/${post.id_post}`}>{post.titulo}</Link>  </p>
                                                                <p>Autor: {post.autor}</p>
                                                                <p>Data: {moment(post.data).format("DD/MM/YYYY")}</p>
                                                                <div>
                                                                    <Link href={`/alterarnoticia/${post.id_post}`}><img className={styles.icon} src="/img/editar.png" /></Link>
                                                                    <Link href={`${post.id_post}`}><span onClick={(e) => {
                                                                        e.preventDefault()
                                                                        setIdpost(post.id_post)
                                                                        setMostrarModal(true)
                                                                    }}><img className={styles.icon} src="/img/excluir.png" /></span></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className={styles.modal} style={{ display: mostrarModal ? "block" : "none" }}>
                                                <p>Deseja realmente excluir a notícia?
                                                    <div className={styles.botoesmold}>
                                                        <div>
                                                            <button onClick={(e) => {
                                                                e.preventDefault()
                                                                eventoExcluirPost(id_post)
                                                                setMostrarModal(false);
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

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.botoes}>
                                <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                    e.preventDefault()
                                }} />

                            </div>
                        </div>
                    </div>
                </form>
            </body>

            <div>
                <Footer />
            </div>

        </>
    )

}
