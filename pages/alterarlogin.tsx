import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/FormAlterarLogin.module.css";
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

    /*useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/";

        }
    }, [isAuthenticated]);*/

    return (
        <>
            <VerifyAuth />
            <div >
                <Navbar />
                <div className={styles.container} >
                    <div className={styles.amor}>
                        <h2 className={styles.h2}>Atualizar Login</h2>
                    </div>
                    <form>
                        <label>
                            <input type="email" className={styles.email} name="name" placeholder="E-mail" onChange={(e) => setEmail(e.currentTarget.value)} />
                        </label>
                    </form>
                    <form>
                        <label>
                            <input type="password" className={styles.email} name="senha" placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
                        </label>

                        <button className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                            (e).preventDefault();
                            handleLogin();
                        }}>Atualizar</button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )

}
