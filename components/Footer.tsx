import styles from "../styles/components/Footer.module.css";
import Link from 'next/link';
import { TableFooter } from '@material-ui/core';

export default function Footer() {
    return (

        <div>
            <footer>
                <div>
                    <h2 id="amor">Amor&Patas</h2>
                </div>
                <div id="adote">
                    <h3 >Adote</h3>
                    <a href="">Cadastre-se</a><br />
                    <a href="">Login</a>
                </div>
                <div id="blog">
                    <h3>Blog</h3>
                </div>
                <div id="quem">
                    <h3 >Quem Somos</h3>
                    <a href="">Sobre nós</a><br />
                    <a href="">FAQs</a>
                </div>
                <div id="copy">
                    <p>© 2021 Amor&Patas. Todos os direitos reservados</p>
                </div>
            </footer>
        </div>


    )
}