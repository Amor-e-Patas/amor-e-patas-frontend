import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/FormLogin.module.css";
import Cookies from 'js-cookie';
import { login } from '../services/login';
import { AuthContext } from "../contexts/auth";
import Link from 'next/link';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    async function handleLogin() {
        if (email == "" ) {
            alert("Por favor, insira seu e-mail.");
            return;
        }

        if( password == ""){
            alert("Por favor, insira sua senha.");
            return;
        }

        try {
            const token = await login(email, password);
            Cookies.set('user-token', token);
            console.log(token);
            window.location.href = "/";
        } catch (err) {
            alert("E-mail e/ou senha incorretos.")
        }
    }


    return (

        <div className={styles.container} >
            <div className={styles.amor}>
                <h2 className={styles.h2}>Login</h2>
            </div>
            <form>
                <label>
                    <input type="email" className={styles.email} name="email" placeholder="E-mail" onChange={(e) => setEmail(e.currentTarget.value)} />
                </label>
            </form>
            <form>

                <label>
                    <input type="password" className={styles.email} name="password" placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} />
                </label>
                <button className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                    (e).preventDefault();
                    handleLogin();
                }}>Enviar</button>

            </form>
            <p className={styles.new}>Novo Usuário?<Link href="/cadastrousuario" ><p className={styles.novouser}>Cadastre-se</p></Link></p>
            <div>
                <p className={styles.voltar}><Link href="/">Voltar</Link></p>
            </div>
        </div>

    )


}
