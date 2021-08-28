import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { getUser } from "../services/user";
import moment from 'moment';

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
        console.log(user);
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
        Nome: <input type="text" defaultValue={nome} ></input>
        CPF: <input type="text" value={cpf} ></input>
        Gênero: <input type="text" defaultValue={genero} ></input>
        Data nascimento: <input type="date" value={datanasc}></input>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  )

}
