import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../styles/components/AnaliseAnimal.module.css";
import {
  alterarAnimal,
  alterarStatus,
  criarAnimal,
  deleteAnimal,
  getAnimais,
  getAnimaisDesaparecidosAnalise2,
} from "../services/animal";
import Link from "next/link";
import { useRouter } from "next/router";
import { getTemperamento } from "../services/temperamento";
import { getSociavel } from "../services/sociavel";
import { getVivencia } from "../services/vivencia";
import { criarImgAnimal } from "../services/img_animal";

interface Temp {
  id_temperamento: number;
  descricao: string;
}

interface Soci {
  id_sociavel: number;
  descricao: string;
}

interface Vive {
  id_vivencia: number;
  descricao: string;
}

interface Animal {
  nome_ani: string;
  id_animal: number;
  id_status: number;
  images: Array<{
    filepath: string;
  }>;
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
  const [id_status, setStatus] = useState("1");
  const router = useRouter();
  const [temperamentos, setTemperamentos] = useState(Array<Temp>());
  const [selectTemp, setSelectTemp] = useState(Array<Number>());
  const [sociaveis, setSociavel] = useState(Array<Soci>());
  const [selectSoci, setSelectSoci] = useState(Array<Number>());
  const [vivencias, setVivencia] = useState(Array<Vive>());
  const [selectVive, setSelectVive] = useState(Array<Number>());
  const [images, setImages] = useState<File[]>([]);
  const [previwImages, setPreviewImages] = useState<string[]>([]);
  const [animais, setAnimais] = useState(Array<Animal>());
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalApro, setMostrarModalApro] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const temperamento = await getTemperamento();
        const sociavel = await getSociavel();
        const vivencia = await getVivencia();
        const animais = await getAnimaisDesaparecidosAnalise2();
        console.log(animais, "teste");

        //setTemperamentos(temperamento);
        //setSociavel(sociavel);
        //setVivencia(vivencia);
        setAnimais(animais);
        console.log(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  async function eventoExcluirAnimal(id_animal: number) {
    try {
      await deleteAnimal(id_animal);
      const animal = await getAnimais();
      setAnimais(animal);
    } catch (err) {
      console.log(err);
    }
  }

  async function eventoModalNegar(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    await alterarStatus(id, 2);
    const animais = await getAnimaisDesaparecidosAnalise2();
    setAnimais(animais);
    setMostrarModal(false);
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      <body>
        <form className={styles.form} name="form">
          <div className={styles.container}>
            <h3 className={styles.titulo}>Animais desaparecidos aguardando análise</h3>
            <div>
              <div className={styles.mae}>
                <div className={styles.containertemp}>
                  <div className={styles.temperamento}>
                    <div className={styles.temp}>
                      <div>
                        {animais.map((animal) => (
                          <div className={styles.noticias}>
                            <div className={styles.imagesContainer}>
                              <img
                                src={`http://localhost:3333/${animal.images[0].filepath}`}
                                className={styles.imagem}
                                alt=""
                              />
                              <hr />
                            </div>
                            <div>
                              <p>
                                <Link href={`/meuanimal/${animal.id_animal}`}>
                                  {animal.nome_ani}
                                </Link>{" "}
                              </p>

                              <div>
                                <tr>
                                  <td>
                                    <span
                                      onClick={async () => {
                                        setId(animal.id_animal);
                                        setMostrarModalApro(true);
                                      }}
                                    >
                                      <img
                                        className={styles.icon}
                                        src="/img/aprovar.png"
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <Link href={`${animal.id_animal}`}>
                                      <span
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setId(animal.id_animal);
                                          setMostrarModal(true);
                                        }}
                                      >
                                        <img
                                          className={styles.icon}
                                          src="/img/acesso-negado.png"
                                        />
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className={styles.modal}
                        style={{ display: mostrarModal ? "block" : "none" }}
                      >
                        <p>
                          Deseja realmente negar anúncio?
                          <div className={styles.botoesmold}>
                            <div>
                              <button onClick={eventoModalNegar}> Sim</button>
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

                      <div
                        className={styles.modal}
                        style={{ display: mostrarModalApro ? "block" : "none" }}
                      >
                        <p>
                          Deseja realmente aprovar anúncio?
                          <div className={styles.botoesmold}>
                            <div>
                              <button
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await alterarStatus(id, 1);
                                  const animais = await getAnimaisDesaparecidosAnalise2();
                                  setAnimais(animais);
                                  setMostrarModalApro(false);
                                }}
                              >
                                Sim
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMostrarModalApro(false);
                                }}
                              >
                                Não
                              </button>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.botoes}>
                <input
                  type="submit"
                  className={styles.botaovoltar}
                  value="Voltar"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </body>

      <div>
        <Footer />
      </div>
    </>
  );
}
