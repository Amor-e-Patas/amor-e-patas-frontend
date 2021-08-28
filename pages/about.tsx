import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";


export default function About() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div >
      <Head>
        <title>Sobre</title>
      </Head>
      <Navbar />
      <div>
        About
      </div>
      <div>
        <Footer />
      </div>
    </div>

  )

}