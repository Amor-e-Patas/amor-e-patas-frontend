import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel, Container, StylesProvider } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";
import styles from "../styles/components/FormAnimal.module.css";
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

        if (senha != confirsenha) {
            alert("Senhas não são iguais. Verifique novamente.");
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
                        <h3 className={styles.titulo}>Cadastro de Animal</h3>
                        <div>
                            <label>
                                <input type="text" name="name" className={styles.nome} placeholder="Nome" onChange={(e) => setNome(e.currentTarget.value)} />
                            </label>
                            <label>
                                <input type="text" className={styles.idade} value={cpf} placeholder="Idade"></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                <select name="genero" id="genero" className={styles.genero} onChange={(e) => setGenero(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o sexo</option>
                                    <option value="Feminino">Fêmea</option>
                                    <option value="Masculino">Macho</option>
                                </select>
                            </label>
                            <label>
                                <input type="date" name="datanasc" className={styles.data} placeholder="Data de nascimento" />
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="text" name="especie" className={styles.especie} placeholder="Especie" />
                            </label>
                            <label>
                                <select name="porte" id="porte" className={styles.porte} onChange={(e) => setGenero(e.currentTarget.value)}>
                                    <option value="" selected>Selecione o porte</option>
                                    <option value="Pequeno">Pequeno</option>
                                    <option value="Medio">Médio</option>
                                    <option value="Grande">Grande</option>
                                </select>
                            </label>
                        </div>

                        <div >
                            <label>
                                <input type="text" className={styles.cor} placeholder="Cor" name="confirsenha" id="confirsenha" />
                            </label>
                        </div>
                        <div>
                            <label>
                                <textarea name="endereco" className={styles.caracteristica} placeholder="Característica animal" onChange={(e) => setEndereco(e.currentTarget.value)}></textarea>
                            </label>
                            <div className={styles.containertemp}>
                                <div className={styles.temperamento}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Temperamento</p>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Docil
                                        </label>
                                    </div>
                                    <div className={styles.temp}>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Agressivo
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Calmo
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Brincalhão
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Sociável
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Arisco
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Independente
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Carente
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.sociavel}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Sociável com</p>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Gatos
                                        </label>
                                    </div>
                                    <div className={styles.temp}>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Desconhecidos
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Cachorros
                                        </label>
                                    </div>
                                    <div >
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Brincalhão
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.vive}>
                                    <div className={styles.temp}>
                                        <p className={styles.p}>Vive bem em</p>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Casa com quintal
                                        </label>
                                    </div>
                                    <div className={styles.temp}>
                                        <label>
                                            <input type="checkbox" id="vendas" name="vendas" />
                                            Apartamento
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>
                                    <input type="file" name="fotos" className={styles.fotos} placeholder="Referência:" onChange={(e) => setReferencia(e.currentTarget.value)} />
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
                    </div>
                </form>
            </body>

            <div>
                <Footer />
            </div>
        </div>

    )

}
