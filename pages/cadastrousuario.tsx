import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";
import styles from "../styles/components/FormUsuario.module.css";
import Button from 'react-bootstrap';
import Link from 'next/link';
import { formata_CPF, valida_CPF, valida_email, formata_telefone } from '../utils/format_cpf_email';



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


    async function eventoCriarUsuario() {

        if (!valida_CPF(cpf)) {
            alert("CPF INVALIDO");
            return;
        }
        if (!valida_email(email)) {
            alert("Email invalido!");
            return;
        }

        if (nome == "") {
            alert("Preencha o nome.");
            return;
        }

        if (cpf == "") {
            alert("Preencha a data de nascimento.");
            return;
        }

        if (datanasc == "") {
            alert("Preencha a data de nascimento.");
            return;
        }

        if (email == "") {
            alert("Preencha o email.");
            return;
        }

        if (senha == "") {
            alert("Preencha a senha.");
            return;
        }

        if (bairro == "") {
            alert("Preencha o bairro.");
            return;
        }

        if (cep == "") {
            alert("Preencha o CEP.");
            return;
        }

        let confirsenha = (document.getElementById("confirsenha") as HTMLInputElement).value;

        if(senha != confirsenha){
            alert("Senhas não são iguais. Verifique novamente.");
            return;
        }

        let termos = (document.getElementById("termos") as HTMLInputElement).value;

        if (termos != ""){
            alert("É preciso aceitar os termos.");
            return;
        }

        let vendas = (document.getElementById("vendas") as HTMLInputElement).value;

        if (vendas != ""){
            alert("É preciso concordar com a política de não venda de animais.");
            return;
        }
        try {
            await
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
            alert("Conta criada ;)");
            window.location.href = "/login";
        } catch (error) {
            alert("Erro ao criar conta.")
        }

    }

    return (
        <div><Navbar />
            <body>
                <form className={styles.form} name="form">
                    <div className={styles.container}>
                        <h3 className={styles.titulo}>Cadastro de Usuário</h3>
                        <div>
                            <label>
                                <input type="text" name="name" className={styles.nome} placeholder="Nome:" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" className={styles.cpf} value={cpf}
                                    onInput={(e) => {
                                        const cpfFormatado = formata_CPF(e.currentTarget.value, cpf);
                                        setCpf(cpfFormatado);
                                    }}
                                    placeholder="088.843.091-09" />
                            </label>

                            <label>
                                <select name="genero" id="genero" className={styles.genero} onChange={(e) => setGenero(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o gênero</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Não declarar" >Não declarar</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="date" name="datanasc" className={styles.data} placeholder="Data de nascimento:" onChange={(e) => setDatanasc(e.currentTarget.value)} />
                            </label>

                            <label>
                                <input type="text" name="celular" className={styles.celular} value={celular}
                                    onInput={(e) => {
                                        const celularFormatado = formata_telefone(e.currentTarget.value, celular);
                                        setCelular(celularFormatado);
                                    }} placeholder="Celular:" />
                            </label>

                        </div>

                        <h3 className={styles.titulo}>Login</h3>
                        <div>
                            <label>
                                <input type="email" name="email" className={styles.email} placeholder=" E-mail:" value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="password" name="senha" className={styles.senha} placeholder="Senha:" onChange={(e) => setSenha(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>

                                <input type="password" className={styles.senha} placeholder="Confirmar senha:" name="confirsenha" id="confirsenha" />
                            </label>
                        </div>
                        <h3 className={styles.titulo}>Endereço</h3>
                        <div>
                            <label>

                                <input type="text" name="endereco" className={styles.endereco} placeholder="Endereço:" onChange={(e) => setEndereco(e.currentTarget.value)} />
                            </label>
                            <label>

                                <input type="text" name="numero" className={styles.numero} placeholder="Número:" onChange={(e) => setNumero(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="bairro" className={styles.bairro} placeholder="Bairro:" onChange={(e) => setBairro(e.currentTarget.value)} />
                            </label>

                            <label>

                                <input type="text" name="cep" className={styles.cep} placeholder="CEP:" onChange={(e) => setCep(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="cidade" className={styles.cidade} placeholder="Cidade:" onChange={(e) => setCidade(e.currentTarget.value)} />
                            </label>

                            <label>

                                <input type="text" name="estado" className={styles.cep} placeholder="Estado:" onChange={(e) => setEstado(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="referencia" className={styles.email} placeholder="Referência:" onChange={(e) => setReferencia(e.currentTarget.value)} />
                            </label>
                        </div>


                        <div className={styles.chec}>
                            <label>
                                <input type="checkbox" id="termos" name="termos" />
                                Li e aceito os termos
                            </label>
                        </div>

                        <div className={styles.chec2}>
                            <label>
                                <input type="checkbox" id="vendas" name="vendas" />
                                Não permitimos a venda de animais através do site.
                            </label>
                        </div>


                        <div className={styles.botoes}>
                            <input type="submit" className={styles.botaovoltar} value="Voltar" onClick={(e) => {
                                e.preventDefault()
                            }} />
                            <input type="submit" className={styles.botaoenviar} value="Enviar" onClick={(e) => {
                                e.preventDefault()
                                eventoCriarUsuario()
                            }} />
                        </div>


                    </div>
                </form>

            </body>

            <div>
                <Footer />
            </div>
        </div>

    )

}
