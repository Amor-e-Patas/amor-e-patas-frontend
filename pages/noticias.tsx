import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/components/FormAnimal.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../components/verifyAuth";
import { criarImgPost, criarPost, getAssuntos, getPosts } from "../services/post";
import moment from 'moment';

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
                                                {
                                                    posts.map((titulo) =>
                                                    <div>
                                                        <p> Titulo: {titulo.titulo}</p>
                                                        <p> Corpo: {titulo.corpo}</p>
                                                        <p> Autor: {titulo.autor}</p>
                                                        <p> Data: {titulo.data}</p>
                                                    </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div>
                                    <div className={styles.imagesContainer}>
                                        {
                                            posts.map((post) =>
                                                    <img src={`http://localhost:3333/${post.images[0].filepath}`} className={styles.imagem} alt="" />
                                            )
                                        }
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
