import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";
import styles from "../styles/components/FormLogin.module.css";



export default function Usuario() {

    return (

        <div className={styles.container} >
            <div className={styles.amor}>
                <h2 className={styles.h2}>Login</h2>
            </div>
            <form>
                <label>
                    <input type="text" className={styles.email} name="name" placeholder="E-mail" />
                </label>
                <div>
                    <a href="" className={styles.link}>Esqueci minha senha</a>
                </div>
                <label>
                    <input type="password" className={styles.email} name="senha" placeholder="Senha" />
                </label>
                <input type="submit" className={styles.botaoenviar} value="Enviar" />

            </form>
            <p className={styles.new}>Novo Usuário?<a href="/cadastrousuario" className={styles.novouser}>Cadastre-se</a></p>
        </div>

    )







}

