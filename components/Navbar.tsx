import styles from "../styles/components/Navbar.module.css";
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    isAuthenticated ? (
      <div>
        <nav>
          <ul className={styles.navBarContainer}>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>Blog</li>
            <li>Desaparecidos</li>
            
            <li>
              <div className={styles.dropdown}>
                <button>Minha Conta</button>
                <div className={styles.dropdowncontent}>
                  <Link href="/homemeuperfil">Meu Perfil</Link>
                  <Link href="/cadastroanimal"><p>Cadastrar animal</p></Link>
                  <Link href="/alterarlogin"><p>Alterar Senha</p></Link>
                  <Link href="/logout"><p>Sair</p></Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

    ) : <div>
      <nav>
        <ul className={styles.navBarContainer}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>Blog</li>
          <li>Desaparecidos</li>

          <li>
            <Link href="/login" passHref>
              <button >Entrar</button>
            </Link>
          </li>
          <li>
            <Link href="/cadastrousuario" passHref>
              <button >Cadastre-se</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )

}