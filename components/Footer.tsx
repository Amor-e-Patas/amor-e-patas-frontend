import styles from "../styles/components/Footer.module.css";
import Link from 'next/link';
import { TableFooter } from '@material-ui/core';
import facebook from "public/img/facebook.png";


export default function Footer() {
    return (

        <div>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.amor}>
                        <h2 className={styles.h2}>Amor&Patas</h2>
                        <div className={styles.imgs}>
                            <img src="/img/facebook.png" className={styles.img} />
                            <img src="/img/twitter.png" className={styles.img} />
                            <img src="/img/youtube.png" className={styles.img} />
                            <img src="/img/phone.png" className={styles.img} />
                        </div>
                    </div>
                    <div className={styles.adote}>
                        <h3 className={styles.titulo}>Adote</h3>
                        <a href="">Cadastre-se</a><br />
                        <a href="">Login</a>
                    </div>
                    <div className={styles.blog}>
                        <h3 className={styles.titulo}>Blog</h3>
                    </div>
                    <div className={styles.quem}>
                        <h3 className={styles.titulo}>Quem Somos</h3>
                        <a href="">Sobre nós</a><br />
                        <a href="">FAQs</a>
                    </div>
                </div>
                <div className={styles.copy}>
                    <p>© 2021 Amor&Patas. Todos os direitos reservados</p>
                </div>

            </footer>
        </div>


    )
}