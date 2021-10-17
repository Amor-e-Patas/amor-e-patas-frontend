import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/FormAlterarLogin.module.css";
import Cookies from 'js-cookie';
import { alterarLogin, getLogin } from '../services/login';
import { AuthContext } from "../contexts/auth";
import Link from 'next/link';
import VerifyAuth from "../components/verifyAuth";
import { useRouter } from 'next/router';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        async function fetchAPI() {
            try {
                const login = await getLogin();

                setEmail(login.email);

            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    async function handleLogin() {
        if (email == "" || password == "") {
            alert("Preencha todos os campos.");
            return;
        }

        let confirsenha = (document.getElementById("confirsenha") as HTMLInputElement).value;

        if(password != confirsenha){
            alert("Senhas não são iguais. Verifique novamente.");
            return;
        }

        try {
            const token = await alterarLogin(email, password);
            alert("Login atualizado");
            router.push("/alterarlogin");
            //window.location.href = "/alterarlogin";
        } catch (err) {
            alert("Erro ao atualizar login.")
        }
    }

    return (
        <>
            <VerifyAuth />
            <div >
                <Navbar />
                <p onClick={() => router.back()} className="pointer"> Voltar</p>
                <div className={styles.container} >
                    <div className={styles.amor}>
                        <h2 className={styles.h2}>Atualizar Login</h2>
                    </div>
                    <form>
                        <label>
                            <input type="email" className={styles.email} name="name" placeholder="E-mail" value={email} readOnly onChange={(e) => setEmail(e.currentTarget.value)} />
                        </label>
                    </form>
                    <form>
                        <label>
                            <input type="password" className={styles.email} name="senha" id="senha" placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
                        </label>

                        <label>
                            <input type="password" className={styles.email} name="confirsenha" id="confirsenha" placeholder="Confirmar senha"/>
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
