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
        <li>Shopping</li>
        <li>Forum</li>
        <li>
          <Link href="/about">
              <a>Sobre</a>
          </Link>
        </li>
      <Button color="primary">Hello World</Button>
      </ul>
      
    </nav>
  )
}