import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { getUser } from "../services/user";
import moment from 'moment';
import { alterarUser } from "../services/user";
import Cookies from "js-cookie";
import styles from "../styles/components/FormAlterarLogin.module.css";

export default function MeuPerfil() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("");
  //function teste() {
  useEffect(() => {
    async function fetchAPI() {
      try {
        const user = await getUser();
        setNome(user.nome_usu);
        setCpf(user.cpf);
        setGenero(user.genero);
        var str = user.data_nasc;
        var date = moment(str);
        var dateComponent = date.utc().format('YYYY-MM-DD');
        //console.log(dateComponent);
        setDatanasc(dateComponent);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  async function handleUser() {
    /*if (email == "" || password == "") {
        alert("Preencha todos os campos.");
        return;
    }*/
    try {
        const token = await alterarUser(nome, cpf, datanasc, genero);
        Cookies.set('user-token', token);
        alert("Usuario atualizado");
        window.location.href = "/meuperfil";
    } catch (err) {
        alert("Erro ao atualizar usuario.")
    }
}

  //}
  //const { isAuthenticated } = useContext(AuthContext);

  //var str = '2011-04-11T10:20:30Z';
  //var date = moment(str);
  //var dateComponent = date.utc().format('YYYY-MM-DD');

  return (
    <div >
      <Head>
        <title>meu perfil</title>
      </Head>
      <Navbar />
      <div>
        Nome: <input type="text" value={nome} onChange={(e) => setNome(e.currentTarget.value)} ></input>
        CPF: <input type="text" value={cpf} onChange={(e) => setCpf(e.currentTarget.value)}></input>
        Gênero: <input type="text" value={genero} onChange={(e) => setGenero(e.currentTarget.value)}></input>
        Data nascimento: <input type="date" value={datanasc} onChange={(e) => setDatanasc(e.currentTarget.value)}></input>
      </div>
      <button className={styles.botaoenviar} value="Enviar" onClick={ (e) => {
                    (e).preventDefault();
                    handleUser();}}>Atualizar</button>
      <div>
        <Footer />
      </div>
    </div>

  )

}
