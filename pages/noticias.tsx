import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/components/FormNoticias.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../components/verifyAuth";
import { criarImgPost, criarPost, getAssuntos, getPosts } from "../services/post";
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

    async function eventoCriarPost() {
    }
    return (
        <>
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
                                                    posts.map((post) =>
                                                        <div className={styles.noticias}>
                                                            <div className={styles.imagesContainer}>
                                                                <img src={`http://localhost:3333/${post.images[0].filepath}`} className={styles.imagem} alt="" />
                                                                <hr />
                                                            </div>
                                                            <div>
                                                                <p><Link href={`/noticia/${post.id_post}`} >{post.titulo}</Link>  </p>
                                                                <p>Autor: {post.autor}</p>
                                                                <p>Data: {moment(post.data).format('DD/MM/YYYY')}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.botoes}>
                                <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                    router.back();
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
