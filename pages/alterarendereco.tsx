import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { getUser } from "../services/user";
import moment from 'moment';
import { alterarUser } from "../services/user";
import Cookies from "js-cookie";
//import styles from "../styles/components/FormAlterarLogin.module.css";
import styles from "../styles/components/FormAlterarUsuario.module.css";
import VerifyAuth from "../components/verifyAuth";
import { alterarAddres, getAddres } from "../services/endereco";

export default function Alterarendereco() {
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [referencia, setReferencia] = useState("");

  //function teste() {
  useEffect(() => {
    async function fetchAPI() {
      try {
        const getEndereco = await getAddres();

        setEndereco(getEndereco.endereco);
        setNumero(getEndereco.numero);
        setBairro(getEndereco.bairro);
        setCep(getEndereco.cep);
        setCidade(getEndereco.cidade);
        setEstado(getEndereco.estado);
        setReferencia(getEndereco.referencia);

      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  async function handleAddres() {
    /*if (email == "" || password == "") {
        alert("Preencha todos os campos.");
        return;
    }*/
    try {
      const token = await alterarAddres(cep, bairro, endereco, numero, referencia, estado, cidade);
      //Cookies.set('user-token', token);
      alert("Endereço atualizado");
      window.location.href = "/alterarendereco";
    } catch (err) {
      alert("Erro ao atualizar endereco.")
    }
  }

  //}
  //const { isAuthenticated } = useContext(AuthContext);

  //var str = '2011-04-11T10:20:30Z';
  //var date = moment(str);
  //var dateComponent = date.utc().format('YYYY-MM-DD');

  return (
    <>

      <div >
        <Head>
          <title>Endereço</title>
        </Head>
        <Navbar />
        <form className={styles.form} name="form">
          <div className={styles.container}>
            <h3 className={styles.titulo}>Atualizar Endereço</h3>
            <div>
              <div>
                <input type="text" name="endereco" className={styles.endereco} value={endereco} placeholder="Endereço:" onChange={(e) => setEndereco(e.currentTarget.value)} />

                <input type="text" name="numero" className={styles.numero} placeholder="Número:" value={numero} onChange={(e) => setNumero(e.currentTarget.value)} />
              </div>

              <div>
                <input type="text" name="bairro" className={styles.bairro} placeholder="Bairro:" value={bairro} onChange={(e) => setBairro(e.currentTarget.value)} />

                <input type="text" name="cep" className={styles.cep} placeholder="CEP:" value={cep} onChange={(e) => setCep(e.currentTarget.value)} />
              </div>

              <div>
                <label>

                  <input type="text" name="cidade" className={styles.cidade} placeholder="Cidade:" value={cidade} onChange={(e) => setCidade(e.currentTarget.value)} />

                </label>

                <label>

                  <input type="text" name="estado" className={styles.cep} placeholder="Estado:" value={estado} onChange={(e) => setEstado(e.currentTarget.value)} />

                </label>
              </div>

              <div>
                <label>

                  <input type="text" name="referencia" className={styles.email} value={referencia} placeholder="Referência:" onChange={(e) => setReferencia(e.currentTarget.value)} />
                </label>
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
