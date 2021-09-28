import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";
import styles from "../styles/components/FormUsuario.module.css";
import Link from 'next/link';
import { formata_CPF, valida_CPF, valida_email, formata_telefone } from '../utils/format_cpf_email';
import axios from "axios";



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

    useEffect(() => {
        async function buscarEndereco() {
            if (cep.length > 7) {
                const API = axios.create();
                const res = await API.get(`https://viacep.com.br/ws/${cep}/json/?callback=`);
                setEndereco(res.data.logradouro);
                setBairro(res.data.bairro);
                setCidade(res.data.localidade);
                setEstado(res.data.uf);
                console.log(res.data);
            }
        }
        buscarEndereco();
    }, [cep]);

    function formata_CEP(campo: string, campoAtual: string) {
        let valoresPermitidos = "0123456789";
        let campoFormatado = campo;
        let ultimoDigito = campoFormatado.charAt(campoFormatado.length - 1);
        if (!valoresPermitidos.includes(ultimoDigito)) {
            campoFormatado = campoFormatado.substr(0, campoFormatado.length - 1);
            console.log(campoFormatado, 'cep valida')
        }
        return campoFormatado
    }

    async function eventoCriarUsuario() {

        if (!valida_CPF(cpf)) {
            alert("CPF inválido! Por favor, insira um CPF válido.");
            return;
        }
        if (!valida_email(email)) {
            alert("E-mail inválido! Por favor, insira um e-mail válido.");
            return;
        }

        if (nome == "") {
            alert("Por favor, insira seu nome.");
            return;
        }

        if (cpf == "") {
            alert("Por favor, insira o CPF.");
            return;
        }

        if (datanasc == "") {
            alert("Por favor, insira a data de nascimento.");
            return;
        }

        if (email == "") {
            alert("Por favor, insira seu e-mail");
            return;
        }

        if (senha == "") {
            alert("Por favor, insira a senha.");
            return;
        }

        if (senha.length < 6 || senha.length > 10) {
            alert("Senha não atende os requisitos mínimos.");
            return;
        }


        let confirsenha = (document.getElementById("confirsenha") as HTMLInputElement).value;

        if (senha != confirsenha) {
            alert("Senhas não correspondentes, favor digite novamente.");
            return;
        }

        let termos = (document.getElementById("termos") as HTMLInputElement).checked;

        if (termos == false) {
            alert("É preciso aceitar os termos.");
            return;
        }

        let vendas = (document.getElementById("vendas") as HTMLInputElement).checked;

        if (vendas == false) {
            alert("É preciso concordar com a política de não venda de animais.");
            return;
        }

        if (bairro == "") {
            alert("Por favor, insira o bairro.");
            return;
        }

        if (cep == "") {
            alert("Por favor, insira o CEP.");
            return;
        }

        if (endereco == "") {
            alert("Por favor, insira o endereço.");
            return;
        }

        if (numero == "") {
            alert("Por favor, insira número do endereço.");
            return;
        }


        if (cidade == "") {
            alert("Por favor, insira a cidade.");
            return;
        }

        if (estado == "") {
            alert("Por favor, insira o estado.");
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
            alert("Usuário criado com sucesso!");
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
                                <input type="text" name="name" className={styles.nome} placeholder="Nome" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="text" className={styles.cpf} value={cpf}
                                    onInput={(e) => {
                                        const cpfFormatado = formata_CPF(e.currentTarget.value, cpf);
                                        setCpf(cpfFormatado);
                                    }}
                                    placeholder="CPF" />
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
                                <input type="date" name="datanasc" className={styles.data} placeholder="Data de nascimento" onChange={(e) => setDatanasc(e.currentTarget.value)} />
                            </label>

                            <label>
                                <input type="text" name="celular" className={styles.celular} value={celular}
                                    onInput={(e) => {
                                        const celularFormatado = formata_telefone(e.currentTarget.value, celular);
                                        setCelular(celularFormatado);
                                    }} placeholder="Celular" />
                            </label>

                        </div>

                        <h3 className={styles.titulo}>Login</h3>
                        <div>
                            <label>
                                <input type="email" name="email" className={styles.email} placeholder=" E-mail" value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="password" name="senha" className={styles.senha} placeholder="Senha" onChange={(e) => setSenha(e.currentTarget.value)} />
                            </label>
                        </div>
                        <div>
                            <label>

                                <input type="password" className={styles.senha} minLength={6} maxLength={10} placeholder="Confirmar senha" name="confirsenha" id="confirsenha" />
                            </label>
                        </div>
                        <h3 className={styles.titulo}>Endereço</h3>
                        <div>
                            <label>
                                <input type="text" name="cep" className={styles.cep} placeholder="CEP" value={cep} maxLength={8}
                                    onInput={(e) => {
                                        const cepFormatado = formata_CEP(e.currentTarget.value, cep);

                                        setCep(cepFormatado);
                                    }} />
                            </label>

                            <label>
                                <input type="text" name="endereco" className={styles.endereco} value={endereco} placeholder="Endereço" onChange={(e) => setEndereco(e.currentTarget.value)} readOnly />
                            </label>

                        </div>

                        <div>
                            <label>
                                <input type="text" name="bairro" className={styles.bairro} value={bairro} placeholder="Bairro" onChange={(e) => setBairro(e.currentTarget.value)} readOnly />
                            </label>

                            <label>
                                <input type="text" name="numero" className={styles.numero} placeholder="Número" onChange={(e) => setNumero(e.currentTarget.value)} />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="cidade" value={cidade} className={styles.cidade} placeholder="Cidade" onChange={(e) => setCidade(e.currentTarget.value)} readOnly />
                            </label>

                            <label>

                                <input type="text" name="estado" className={styles.estado} value={estado} placeholder="Estado" onChange={(e) => setEstado(e.currentTarget.value)} readOnly />
                            </label>
                        </div>

                        <div>
                            <label>

                                <input type="text" name="referencia" className={styles.email} placeholder="Referência" onChange={(e) => setReferencia(e.currentTarget.value)} />
                            </label>
                        </div>


                        <div className={styles.chec}>

                            <label>
                                <input type="checkbox" id="termos" name="termos" />
                                <Link href="termos">Li e aceito os termos</Link>
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
