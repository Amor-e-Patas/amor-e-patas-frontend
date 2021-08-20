import Navbar from "../components/Navbar"
import Head from "next/head";

export default function About() {
  return (
    <div >
      <Head>
        <title>Sobre</title>
      </Head>
      <Navbar />
      <div>
        About
      </div>
    </div>
  )
}