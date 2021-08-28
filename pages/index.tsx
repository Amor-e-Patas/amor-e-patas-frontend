import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <div >
      <Head>
        <title>Inicio</title>
      </Head>
      <Navbar />
      <div>
        Inicio
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
