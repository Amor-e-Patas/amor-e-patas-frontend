import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/components/Index.module.css";
import Head from "next/head";
import { getAnimal } from "../services/animal";
import { criarAnimal, getAnimaisApro} from "../services/animal";
import { useRouter } from "next/router";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";

interface Animal {
  nome_ani: string;
  id_animal: number;
  id_status: number;
  images: Array<{
    filepath: string;
  }>;
}

export default function Home() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [id_status, setStatus] = useState("1");
  const [animais, setAnimais] = useState(Array<Animal>());

  useEffect(() => {
    async function fetchAPI() {
        try {
            const animais = await getAnimaisApro();
            console.log(animais,'teste');

            setAnimais(animais);
            console.log(animais);

        } catch (err) {
            console.log(err);
        }
    }

    fetchAPI();
}, []);

  return (
    <div className={styles.body}>
      <div>
      <Head>
        <title>Amor & Patas</title>
      </Head>
      <Navbar />
      <div>
        <div>
          
            <img className={styles.img} src="/img/logo.png" alt="" />
          
        </div>
        <hr className={styles.hr} />
        <div>
          <h1 className={styles.adote}>Não compre, adote</h1>
          <p className={styles.frase}>
            Não compre, adote. Por que comprar um cão ou um gatinho{" "}
          </p>
          <p className={styles.frase}>
            se existem diversos bichinhos precisando de amor e um lar?{" "}
          </p>
        </div>

        <div className={styles.animais}>
          {
             animais.map((animal, index) =>
                  <div className={styles.item} key={index}>
                    <img src={`http://localhost:3333/${animal.images[0].filepath}`} className={styles.imagem} alt="" />
                    <hr className={styles.hr2} />
                    <p className={styles.pnome}><Link href={`/animalindex/${animal.id_animal}`} >{animal.nome_ani}</Link></p>
                  </div>
             )
        }
        </div>
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
