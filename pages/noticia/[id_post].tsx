import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import styles from "../../styles/components/FormNoticia.module.css";
import { useRouter } from "next/router";
import VerifyAuth from "../../components/verifyAuth";
import {
  criarImgPost,
  criarPost,
  getAssuntos,
  getPost,
} from "../../services/post";
import { getAssunto } from "../../services/post";
import moment from "moment";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import {
  criarComentario,
  deleteComentario,
  getComentarios,
} from "../../services/comentario";
import { AuthContext } from "../../contexts/auth";

interface Assunto {
  id_assunto: number;
  nome_ass: string;
}

interface Post {
  id_post: number;
  titulo: string;
  corpo: string;
  autor: string;
  data: string;
  assuntos: Array<Assunto>;
  images: Array<{
    filepath: string;
  }>;
}

interface Comentario {
  texto: string;
  data: string;
  id_comentario: number;
  nome_usu: string;
  id_post: number;
  id_usuario: number;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      id_post: context.params?.id_post,
    },
  };
};

export default function Usuario({
  id_post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
  const [id_usuarioComentario, setUsuario] = useState("");
  const [id_comentario, setIdComentario] = useState(0);
  const [dataComent, setDataComent] = useState(moment().format("YYYY-MM-DD"));
  const [mostrarModal, setMostrarModal] = useState(false);
  const { id_usuario, role } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const post = (await getPost(id_post)) as Post;

        setPosts(post);
        setAutor(post.autor);
        setTitulo(post.titulo);
        setCorpo(post.corpo);
        setData(post.data);

        //const assunto = await getAssunto() as Assunto;
        setAssuntos(post.assuntos);
        //setAssuns(post.assuntos);

        const assun = post.assuntos.map((assun) => assun.id_assunto);

        console.log(post, "caract");
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
      await criarComentario(
        texto,
        dataComent,
        parseInt(id_usuarioComentario),
        id_post
      );
      const comentario = await getComentarios(id_post);
      setComentarios(comentario);
      setTexto("");
    } catch (error) {
      alert("Erro ao criar comentário.");
    }
  }

  async function eventoGetComentario() {
    try {
      const comentario = await getComentarios(id_post);
      setComentarios(comentario);
    } catch (error) {
      alert("Erro ao retornar comentário.");
    }
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div className={styles.imagesContainer}>
          <img
            src={`http://localhost:3333/${post?.images[0].filepath}`}
            className={styles.imagem}
            alt=""
          />
        </div>
      </div>
      <body className={styles.body}>
        <div className={styles.container}>
          <div className={styles.temperamento}>
            <div className={styles.temp}>
              <table>
                <tr>
                  {assuntos.map((assunto) => (
                    <td>{assunto.nome_ass} </td>
                  ))}
                  <td>
                    <p className={styles.autor}>                   
                      | {moment(data).format("DD/MM/YYYY")}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <div>
              <h1 className={styles.titulo}>{titulo}</h1>
              <div>
                <p className={styles.autor}>Escrito por {autor} </p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: corpo }} className={styles.noticia}></div>
            </div>
          </div>
          <br />
          <div>
            <hr />
          </div>
          <br />
          {id_usuario != 0 ? (
            <div>
              <textarea
                name="comentario"
                className={styles.comentario}
                placeholder="Adicionar um comentário..."
                value={texto}
                onChange={(e) => setTexto(e.currentTarget.value)}
              ></textarea>
              <input
                type="submit"
                className={styles.botaoenviar}
                value="Comentar"
                onClick={(e) => {
                  e.preventDefault();
                  eventoCriarPost();
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <br />

          <div>
            {comentarios.map((comentario) => (
              <div>
                <div className={styles.comentariopost}>
                  <p className={styles.autorcom}>{comentario.nome_usu}</p>
                  <p className={styles.date}>
                    {moment(comentario.data).format("DD/MM/YYYY")}
                  </p>
                  <p className={styles.comen}> {comentario.texto}</p>
                  {id_usuario == comentario.id_usuario || role == "admin" ? (
                    <button
                      className={styles.botaoexcluir}
                      value="excluir"
                      onClick={(e) => {
                        e.preventDefault();
                        setIdComentario(comentario.id_comentario);
                        console.log(comentario, "coem");
                        setMostrarModal(true);
                      }}
                    >
                      Excluir
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <br />
              </div>
            ))}
          </div>
          <div
            className={styles.modal}
            style={{ display: mostrarModal ? "block" : "none" }}
          >
            <p>
              Deseja realmente excluir a notícia?
              <div className={styles.botoesmold}>
                <div>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteComentario(id_comentario);
                      setMostrarModal(false);

                      const comentario = await getComentarios(id_post);
                      setComentarios(comentario);
                    }}
                  >
                    {" "}
                    Sim
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setMostrarModal(false);
                    }}
                  >
                    {" "}
                    Não
                  </button>
                </div>
              </div>
            </p>
          </div>
          <div></div>
        </div>
      </body>
      <div></div>
      <div>
        <Footer />
      </div>
    </>
  );
}
