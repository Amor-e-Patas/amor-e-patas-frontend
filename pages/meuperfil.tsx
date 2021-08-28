import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";


export default function MeuPerfil() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div >
      <Head>
        <title>meu perfil</title>
      </Head>
      <Navbar />
      <div>
        meu perfil
      </div>
      <div>
        <Footer />
      </div>
    </div>

  )

}