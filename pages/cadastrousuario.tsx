import Navbar from "../components/Navbar"
import { InputLabel, FormLabel } from '@material-ui/core';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";


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
        <div>
            <Navbar />
            <form>
                <label>
                    Nome:
                    <input type="text" name="name" onChange={(e) => setNome(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Cpf:
                    <input type="text" name="cpf" onChange={(e) => setCpf(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Gênero:
                    <input type="text" name="genero" onChange={(e) => setGenero(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Data de nascimento:
                    <input type="date" name="datanasc" onChange={(e) => setDatanasc(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Celular:
                    <input type="text" name="celular" onChange={(e) => setCelular(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    E-mail:
                    <input type="text" name="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Senha:
                    <input type="password" name="senha" onChange={(e) => setSenha(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Confirmar senha:
                    <input type="password" name="confirsenha" />
                </label>
                <br />
                <label>
                    Endereço:
                    <input type="text" name="email" onChange={(e) => setEndereco(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Número:
                    <input type="text" name="numero" onChange={(e) => setNumero(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Bairro:
                    <input type="text" name="bairro" onChange={(e) => setBairro(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    CEP:
                    <input type="text" name="cep" onChange={(e) => setCep(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Cidade:
                    <input type="text" name="cidade" onChange={(e) => setCidade(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Estado:
                    <input type="text" name="estado" onChange={(e) => setEstado(e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Referência:
                    <input type="text" name="referencia" onChange={(e) => setReferencia(e.currentTarget.value)} />
                </label>
                <br />
                <input type="submit" value="Enviar" onClick={(e) => {
                    e.preventDefault()
                    eventoCriarUsuario()
                }} />

            </form>
        </div>
    )
}