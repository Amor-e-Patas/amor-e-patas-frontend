import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { InputLabel, FormLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import api from "../services/services";
import React, { useState, useEffect } from "react";
import { criarUsuario } from "../services/user";


export default function Usuario() {

    return (
        <div>
            <Navbar />
            <form>
                <label>
                    E-mail:
                    <input type="text" name="name" />
                </label>
                <br />
                <label>
                    Senha:
                    <input type="password" name="senha" />
                </label>
                <br />
                <input type="submit" value="Enviar" />
            </form>

            <div>
                <Footer />
            </div>
        </div>

    )







}

