import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../styles/components/FormNoticia.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../../components/verifyAuth";
import { criarImgPost, criarPost, getAssuntos, getPost } from "../../services/post";
import { getAssunto } from "../../services/post";
import moment from 'moment';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { criarComentario, deleteComentario, getComentarios } from "../../services/comentario";

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

interface Comentario {
    texto: string,
    data: string,
    id_comentario: number,
    nome_usu: string,
    id_post: number
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
    const [assuntoT, setAssuns] = useState(Array<Assunto>());
    const [comentarios, setComentarios] = useState(Array<Comentario>());
    const [texto, setTexto] = useState("");
    const [id_usuario, setUsuario] = useState("");
    const [dataComent, setDataComent] = useState(moment().format("YYYY-MM-DD"));
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        async function fetchAPI() {
            try {

                const post = await getPost(id_post) as Post;

                setPosts(post);
                setAutor(post.autor);
                setTitulo(post.titulo);
                setCorpo(post.corpo);
                setData(post.data);

                //const assunto = await getAssunto() as Assunto;
                setAssuntos(post.assuntos);
                //setAssuns(post.assuntos);

                const assun = post.assuntos.map(assun => assun.id_assunto)

                console.log(post, 'caract')
                setSelectAssunto(assun);

                const comentario = await getComentarios(id_post);
                setComentarios(comentario);
                console.log(comentario);

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    async function eventoCriarPost() {

        if (texto == "") {
            alert("Comentário vazio");
            return;
        }

        try {
            await
                criarComentario(texto,
                    dataComent,
                    parseInt(id_usuario),
                    id_post);
            const comentario = await getComentarios(id_post);
            setComentarios(comentario);
            setTexto("");
        } catch (error) {
            alert("Erro ao criar comentário.")
        }
    }

    async function eventoGetComentario() {

        try {
            const comentario = await getComentarios(id_post);
            setComentarios(comentario);
        } catch (error) {
            alert("Erro ao retornar comentário.")
        }

    }
    return (
        <>
            <VerifyAuth />
            <div><Navbar /></div>
            <div>
                <div className={styles.imagesContainer}>
                    <img src={`http://localhost:3333/${post?.images[0].filepath}`} className={styles.imagem} alt="" />
                </div>
            </div>
            <body className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.temperamento}>
                        <div className={styles.temp}>
                            <div>
                                <p className={styles.autor}> ASSUNTO | {data}</p>

                            </div>
                            <p className={styles.amor}>Mais Detalhes</p>
                            <ul>
                                {
                                    assuntos.map((assunto) =>
                                        <li>{assunto.nome_ass}</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className={styles.titulo}>{titulo}</h2>
                            <div>
                                <p className={styles.autor}>Escrito por {autor} </p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: corpo }} >
                            </div>
                        </div>
                    </div>

                    <div>
                        <textarea name="comentario" placeholder="Adicionar um comentário..." value={texto} onChange={(e) => setTexto(e.currentTarget.value)} ></textarea>
                    </div>

                    <input type="submit" className={styles.botaoenviar} value="Comentar" onClick={(e) => {
                        e.preventDefault()
                        eventoCriarPost()
                    }} />

                    <div>
                        {
                            comentarios.map((comentario) =>
                                <div >
                                    <div>
                                        <p>Autor: {comentario.nome_usu}</p>
                                        <p>Comentário: {comentario.texto}</p>
                                        <p>Data: {comentario.data}</p>
                                        <hr />
                                        <div className={styles.modal} style={{ display: mostrarModal ? "block" : "none" }}>
                                            <p>deseja realmente deletar?
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteComentario(comentario.id_comentario);
                                                    eventoGetComentario();
                                                }}> Sim</button>
                                                <button onClick={(e) => {
                                                    e.preventDefault()
                                                    setMostrarModal(false);
                                                }}> Não</button>
                                            </p>
                                        </div>
                                        <button className={styles.botaoexcluir} value="excluir" onClick={(e) => {
                                            e.preventDefault()
                                            setMostrarModal(true);
                                        }}>Excluir</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </body>
            <div></div>
            <div>
                <Footer />
            </div>

        </>
    )

}
