import Navbar from "../components/Navbar"
import Head from "next/head";
import { InputLabel, FormLabel  } from '@material-ui/core';
import api from "../services/services";
import React, { useState, useEffect } from "react";


export default function Usuario() {
    api.get("telefone/1").then((response) => {
        console.log(response.data);
    });
  return (
    <div>
    <Navbar />
    <form>
        <label>
            Nome:
            <input type="text" name="name" />
        </label>
        <br/>
        <label>
            Cpf:
            <input type="text" name="cpf" />
        </label>
        <br/>
        <label>
            Gênero:
            <input type="text" name="genero" />
        </label>
        <br/>
        <label>
            Data de nascimento:
            <input type="text" name="datanasc" />
        </label>
        <br/>
        <label>
            Celular:
            <input type="text" name="celular" />
        </label>
        <br/>
        <label>
            E-mail:
            <input type="text" name="email" />
        </label>
        <br/>
        <label>
            Senha:
            <input type="password" name="senha" />
        </label>
        <br/>
        <label>
            Confirmar senha:
            <input type="password" name="confirsenha" />
        </label>
        <br/>
        <label>
            Endereço:
            <input type="text" name="email" />
        </label>
        <br/>
        <label>
            Número:
            <input type="text" name="numero" />
        </label>
        <br/>
        <label>
            Bairro:
            <input type="text" name="bairro" />
        </label>
        <br/>
        <label>
            CEP:
            <input type="text" name="cep" />
        </label>
        <br/>
        <label>
            Cidade:
            <input type="text" name="cidade" />
        </label>
        <br/>
        <label>
            Estado:
            <input type="text" name="estado" />
        </label>
        <br/>
        <label>
            Referência:
            <input type="text" name="referencia" />
        </label>
        <br/>
        <input type="submit" value="Enviar" />
    </form>
    </div>
  )
}