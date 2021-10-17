import styles from "../styles/components/Navbar.module.css";
import Link from 'next/link';
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { isAdm } = useContext(AuthContext);
  return (

    isAdm ? (<div>
      <nav>
        <div>

          <ul className={styles.navBarContainer}>
            <img src="/img/logo2.png" className={styles.img} />
            <li>
            </li>

            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <Link href="/noticiasauth">
              <li>Blog</li>
            </Link>
            <Link href="/adotar">
              <li>Adotar</li>
            </Link>
            <Link href="/desaparecidos">
              <li>Desaparecidos</li>
            </Link>
            
            

            <li>
              <div className={styles.dropdown}>
                <button className={styles.conta}>Minha Conta</button>
                <div className={styles.dropdowncontent}>
                  <Link href="/homemeuperfil">Meu Perfil</Link>
                  <Link href="/analiseanimal"><p>Analise de animal</p></Link>
                  <Link href="/cadastroanimal"><p>Cadastrar animal</p></Link>
                  <Link href="/cadastronoticia"><p>Cadastrar notícia</p></Link>
                  <Link href="/meusanimais"><p>Meus animais</p></Link>
                  <Link href="/desaparecidos"><p>Meus animais desaparecidos</p></Link>
                  <Link href="/alterarlogin"><p>Alterar Senha</p></Link>
                  <Link href="/logout"><p>Sair</p></Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
    
   : isAuthenticated ? (
      <div>
        <nav>
          <div>

            <ul className={styles.navBarContainer}>
              <img src="/img/logo2.png" className={styles.img} />
              <li>
              </li>

              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <Link href="/noticias">
                <li>Blog</li>
              </Link>
              <Link href="/adotar">
              <li>Adotar</li>
            </Link>
              <Link href="/desaparecidos">
                <li>Desaparecidos</li>
              </Link>
              

              <li>
                <div className={styles.dropdown}>
                  <button className={styles.conta}>Minha Conta</button>
                  <div className={styles.dropdowncontent}>
                    <Link href="/homemeuperfil">Meu Perfil</Link>
                    <Link href="/cadastroanimal"><p>Cadastrar animal</p></Link>
                    <Link href="/meusanimais"><p>Meus animais</p></Link>
                    <Link href="/desaparecidos"><p>Meus animais desaparecidos</p></Link>
                    <Link href="/animaisnegados"><p>Animais não aprovados</p></Link>
                    <Link href="/animaisanalise"><p>Animais em análise</p></Link>
                    <Link href="/alterarlogin"><p>Alterar Senha</p></Link>
                    <Link href="/logout"><p>Sair</p></Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    ) : <div>
      <nav>
        <ul className={styles.navBarContainer}>
          <img src="/img/logo2.png" className={styles.img} />
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <Link href="/noticias">
            <li>Blog</li>
          </Link>

          <Link href="/adotar">
              <li>Adotar</li>
            </Link>

          <Link href="/desaparecidos">
            <li>Desaparecidos</li>
          </Link>

          
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