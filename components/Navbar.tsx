import styles from "../styles/components/Navbar.module.css";
import Link from 'next/link';
import { Button } from '@material-ui/core';

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.navBarContainer}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>Blog</li>
        <li>Desaparecidos</li>

        {/* <li> 
         <Link href="/about">
              <a>Sobre</a>
          </Link>
        
         </li> */}
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
        <li>
          <Link href="/logout" passHref> 
            <button>logout</button>
          </Link>
        </li>

      </ul>

    </nav>
  )
}