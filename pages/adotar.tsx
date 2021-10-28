import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/components/Index.module.css";
import Head from "next/head";
import { getAnimal } from "../services/animal";
import { criarAnimal, getAnimaisApro } from "../services/animal";
import { useRouter } from "next/router";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";

interface Animal {
  nome_ani: string;
  id_animal: number;
  id_status: number;
  tipo_sexo: string;
  id_sexo: number;
  id_especie: number;
  nome_esp: string;
  id_porte: number;
  tipo_porte: string;
  images: Array<{
    filepath: string;
  }>;
}

export default function Home() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [id_porte, setPorte] = useState<Number>();
  const [id_especie, setEspecie] = useState<Number>();
  const [id_sexo, setSexo] = useState<Number>();
  const [animais, setAnimais] = useState(Array<Animal>());
  const [animaisFiltrados, setAnimaisFiltrados] = useState(Array<Animal>());

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animais = await getAnimaisApro();
        setAnimaisFiltrados(animais);
        setAnimais(animais);
        console.log(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  useEffect(() => {
    let animaisTemp = [...animais];

    if (id_porte != undefined) {
      animaisTemp = animaisTemp.filter((animal) => animal.id_porte == id_porte);
    }

    if (id_sexo != undefined) {
      animaisTemp = animaisTemp.filter((animal) => animal.id_sexo == id_sexo);
    }

    if (id_especie != undefined) {
      animaisTemp = animaisTemp.filter(
        (animal) => animal.id_especie == id_especie
      );
    }
    console.log(animaisTemp, "animal_temp22");

    setAnimaisFiltrados(animaisTemp);

    console.log(id_porte, id_especie, id_sexo, "id_porte, id_especie, id_sexo");

    console.log(animaisFiltrados, "animal_temp333");
  }, [id_porte, id_especie, id_sexo]);

  return (
    <div className={styles.body}>
      <div>
        <Head>
          <title>Amor & Patas</title>
        </Head>
        <Navbar />
        <div>
          <div>
            <tr>
              <td>
                <select
                  className={styles.select}
                  onChange={(e) =>
                    setPorte(parseInt(e.target.value) || undefined)
                  }
                >
                  <option value={undefined} selected>
                    Selecione o porte
                  </option>
                  <option value="2">Pequeno</option>
                  <option value="3">Médio</option>
                  <option value="1">Grande</option>
                </select>
              </td>
              <td>
                <select
                  className={styles.select}
                  onChange={(e) =>
                    setSexo(parseInt(e.target.value) || undefined)
                  }
                >
                  <option value={undefined} selected>
                    Selecione o sexo
                  </option>
                  <option value="1">Fêmea</option>
                  <option value="2">Macho</option>
                </select>
              </td>
              <td>
                <select
                  className={styles.select}
                  onChange={(e) =>
                    setEspecie(parseInt(e.target.value) || undefined)
                  }
                >
                  <option value={undefined} selected>
                    Selecione a espécie
                  </option>
                  <option value="1">Gato</option>
                  <option value="2">Cachorro</option>
                </select>
              </td>
            </tr>
          </div>
          
          <div>
            <h1 className={styles.adote}>Não compre, adote</h1>
          </div>

          <div className={styles.animais}>
            {animaisFiltrados.map((animal) => (
              <div className={styles.item}>
                <img
                  src={`http://localhost:3333/${animal.images[0].filepath}`}
                  className={styles.imagem}
                  alt=""
                />
                <hr className={styles.hr2} />
                <p className={styles.pnome}>{animal.nome_ani}<Link href={`/animalindex/${animal.id_animal}`} >{animal.nome_ani}</Link></p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
