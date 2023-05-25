import Link from 'next/link'
import styles from './styles.module.scss'
import { useContext } from 'react'

import { FiLogOut, FiShoppingCart } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'

export function Header(){

    const { user, signOut } = useContext(AuthContext);
    

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/" legacyBehavior={true}>
                <img src="/logo.png" width={135} height={125} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category' legacyBehavior={true}>
                        <a>Categoria</a>
                    </Link>

                    <Link href='/product' legacyBehavior={true}>
                        <a>Produtos</a>
                    </Link>

                    <Link href='/' legacyBehavior={true}>
                        <a>{user?.name}</a>
                    </Link>

                    <Link href='/cart' legacyBehavior={true}>
                        <a>
                            <FiShoppingCart color="#fff" size={24} />
                        </a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24}/>
                    </button>
                </nav>


            </div>
        </header>
    )
}