import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { getUser } from "../services/user";
import moment from 'moment';
import { alterarUser } from "../services/user";
import Cookies from "js-cookie";
import styles from "../styles/components/FormAlterarUsuario.module.css";
import { useRouter } from 'next/router';

export default function MeuPerfil() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("");
  const router = useRouter();
 
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
        setDatanasc(dateComponent);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  async function handleUser() {
    if (nome == "") {
      alert("Preencha o nome.");
      return;
  }

  if (cpf == "") {
      alert("Preencha a data de nascimento.");
      return;
  }

  if (datanasc == "") {
      alert("Preencha a data de nascimento.");
      return;
  }
    
    try {
      const token = await alterarUser(nome, cpf, datanasc, genero);
      alert("Usuario atualizado");
      router.push("/meuperfil");
    } catch (err) {
      alert("Erro ao atualizar usuario.")
    }
  }

  return (
    <div >
      <Head>
        <title>meu perfil</title>
      </Head>
      <Navbar />
      <form className={styles.form} name="form">
        <div className={styles.container}>
          <h2 className={styles.titulo}>Atualizar Cadastro de Usuário</h2>
          <div>
            <div>
              <input type="text" className={styles.nome} value={nome} onChange={(e) => setNome(e.currentTarget.value)} ></input>

              <input type="text" className={styles.cpf} value={cpf} readOnly onChange={(e) => setCpf(e.currentTarget.value)}></input>
            </div>
            <div>
              <select name="genero" id="genero" className={styles.genero} value={genero} onChange={(e) => setGenero(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o gênero</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Não declarar" >Não declarar</option>
                                </select>
              <input type="date" className={styles.data} value={datanasc} onChange={(e) => setDatanasc(e.currentTarget.value)}></input>
            </div>

            <button className={styles.botaoenviar} value="Enviar" onClick={(e) => {
              (e).preventDefault();
              handleUser();
            }}>Atualizar</button>
          </div>
        </div>
      </form>
      <div>
        <Footer />
      </div>
    </div>

  )

}
