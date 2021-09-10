import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/HomeMeuPerfil.module.css";
import Cookies from 'js-cookie';
import { alterarLogin } from '../services/login';
import { AuthContext } from "../contexts/auth";
import Link from 'next/link';
import VerifyAuth from "../components/verifyAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    async function handleLogin() {
        if (email == "" || password == "") {
            alert("Preencha todos os campos.");
            return;
        }
        try {
            const token = await alterarLogin(email, password);
            Cookies.set('user-token', token);
            alert("Login atualizado");
            window.location.href = "/about";
        } catch (err) {
            alert("Erro ao atualizar login.")
        }
    }


    return (
        <>
            <div >
                <Navbar />
                <div className={styles.container} >
                    <div className={styles.amor}>
                        <h2 className={styles.h2}>Meu Perfil</h2>
                    </div>
                    <body className={styles.body}>
                        <div className={styles.quadros}>
                            <div className={styles.item}>
                                <img src="/img/perfil.png" className={styles.imagem} alt="" />
                                <p className={styles.p}><Link href="/alterarusuario">Atualizar meus dados pessoais</Link></p>
                            </div>
                            <div className={styles.item}>
                                <img src="/img/endereco.png" className={styles.imagem} alt="" />
                                <p className={styles.p}><Link href="/alterarendereco">Atualizar meu endereço</Link></p>
                            </div>
                            <div className={styles.item}>
                                <img src="/img/celular.png" className={styles.imagem} alt="" />
                                <p className={styles.p}><Link href="/alterartelefone">Atualizar meu contato</Link></p>
                            </div>
                            <div className={styles.item}>
                                <img src="/img/animal.png" className={styles.imagem} alt="" />
                                <p className={styles.p}><Link href="/alteraranimal">Meus animais</Link></p>
                            </div>
                            
                        </div>
                    </body>
                </div>
                <Footer />
            </div>
        </>
    )

}
