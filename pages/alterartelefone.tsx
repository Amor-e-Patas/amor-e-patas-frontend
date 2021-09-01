import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import moment from 'moment';
import { alterarPhone, getPhone } from "../services/telefone";
import Cookies from "js-cookie";
import styles from "../styles/components/FormAlterarUsuario.module.css";
import VerifyAuth from "../components/verifyAuth";

export default function AlterarTelefone() {
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      try {
        const getTelefone = await getPhone();

        setTelefone(getTelefone.num_telefone);

      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  async function handleAddres() {
    
    try {
      const token = await alterarPhone(telefone);
      alert("Telefone atualizado");
      window.location.href = "/alterartelefone";
    } catch (err) {
      alert("Erro ao atualizar telefone.")
    }
  }

  return (
    <>

      <div >
        <Head>
          <title>Telefone</title>
        </Head>
        <Navbar />
        <form className={styles.form} name="form">
          <div className={styles.container}>
            <h3 className={styles.titulo}>Atualizar Telefone</h3>
            <div>
              <div>
                <input type="text" name="endereco" className={styles.endereco} value={telefone} placeholder="Telefone" onChange={(e) => setTelefone(e.currentTarget.value)} />

              </div>

              <button className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                (e).preventDefault();
                handleAddres();
              }}>Atualizar</button>
            </div>
          </div>
        </form>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )

}
