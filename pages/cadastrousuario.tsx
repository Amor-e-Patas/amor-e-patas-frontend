import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";
import styles from "../styles/components/FormUsuario.module.css";
import Button from 'react-bootstrap';



export default function Usuario() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [datanasc, setDatanasc] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [referencia, setReferencia] = useState("");
    function eventoCriarUsuario() {
        criarUsuario(nome,
            cpf,
            genero,
            datanasc,
            celular,
            email,
            senha,
            endereco,
            numero,
            bairro,
            cep,
            cidade,
            estado,
            referencia)
    }
    return (
        <div><Navbar />
            <body className={styles.body}>


                <form>

                    <div className={styles.container}>
                        <h3 className={styles.titulo}>Cadastro de Usuário</h3>
                        <div>
                            <label>
                                <input type="text" name="name" className={styles.nome} placeholder="Nome:" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>

                                <input type="text" name="cpf" className={styles.cpf} placeholder=" CPF:" onChange={(e) => setCpf(e.currentTarget.value)} />
                            </label>

                            <label>

                                <input type="text" name="genero" className={styles.cpf} placeholder="Gênero:" onChange={(e) => setGenero(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="date" name="datanasc" className={styles.data} placeholder="Data de nascimento:" onChange={(e) => setDatanasc(e.currentTarget.value)} />
                            </label>

                            <label>
                                <input type="text" name="celular" className={styles.celular} placeholder="Celular:" onChange={(e) => setCelular(e.currentTarget.value)} />
                            </label>

                        </div>

                        <h3 className={styles.titulo}>Login</h3>
                        <div>
                            <label>
                                <input type="text" name="email" className={styles.email} placeholder=" E-mail:" onChange={(e) => setEmail(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="password" name="senha" className={styles.senha} placeholder="Senha:" onChange={(e) => setSenha(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>

                                <input type="password" className={styles.senha} placeholder="Confirmar senha:" name="confirsenha" />
                            </label>
                        </div>
                        <h3 className={styles.titulo}>Endereço</h3>
                        <div>
                            <label>

                                <input type="text" name="endereco" className={styles.endereco} placeholder="Endereço:" onChange={(e) => setEndereco(e.currentTarget.value)} />
                            </label>
                            <label>

                                <input type="text" name="numero" className={styles.endereco} placeholder="Número:" onChange={(e) => setNumero(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="bairro" className={styles.bairro} placeholder="Bairro:" onChange={(e) => setBairro(e.currentTarget.value)} />
                            </label>

                            <label>

                                <input type="text" name="cep" className={styles.bairro} placeholder="CEP:" onChange={(e) => setCep(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="cidade" className={styles.cidade} placeholder="Cidade:" onChange={(e) => setCidade(e.currentTarget.value)} />
                            </label>

                            <label>

                                <input type="text" name="estado" className={styles.cidade} placeholder="Estado:" onChange={(e) => setEstado(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="referencia" className={styles.referencia} placeholder="Referência:" onChange={(e) => setReferencia(e.currentTarget.value)} />
                            </label>
                        </div>
                        <input type="submit" value="Enviar" onClick={(e) => {
                            e.preventDefault()
                            eventoCriarUsuario()
                        }} />
                    </div>
                </form>
            </body>
            <div>
                <Footer />
            </div>
        </div>


    )







}

