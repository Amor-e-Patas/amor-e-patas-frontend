import Navbar from "../components/Navbar"
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
    </div>
  )
}
