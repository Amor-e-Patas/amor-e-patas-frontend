import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { alterarPhone, getPhone } from "../services/telefone";
import Cookies from "js-cookie";
import styles from "../styles/components/FormAlterarUsuario.module.css";
import VerifyAuth from "../components/verifyAuth";
import { useRouter } from 'next/router';

export default function AlterarTelefone() {
  const [telefone, setTelefone] = useState("");
  const router = useRouter();

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
    if (telefone == "") {
      alert("Preencha o telefone.");
      return;
    }
    try {
      const token = await alterarPhone(telefone);
      alert("Telefone atualizado");
      router.push("/alterartelefone");
      //window.location.href = "/alterartelefone";
    } catch (err) {
      alert("Erro ao atualizar telefone.")
    }
  }

  return (
    <>
      <VerifyAuth />
      <div >
        <Head>
          <title>Telefone</title>
        </Head>
        <Navbar />
        
        <form className={styles.form} name="form">
        <p onClick={() => router.back()} className="pointer"> Voltar</p>
        
          <div className={styles.containerTel}>
            <h3 className={styles.titulo}>Atualizar Telefone</h3>
            <div>
              <div>
                <input type="text" name="endereco" className={styles.nome2} value={telefone} placeholder="Telefone" onChange={(e) => setTelefone(e.currentTarget.value)} />

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
