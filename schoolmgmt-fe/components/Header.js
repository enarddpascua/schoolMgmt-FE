import Link from 'next/link'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Search from './Search'
import styles from '@/styles/Header.module.css'
import AuthContext from '@/context/AuthContext'


export default function Header(){
    const {user, logout} = useContext(AuthContext)
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href='/about'>
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/courses'>
                            <a>Courses</a>
                        </Link>
                    </li>
                    {user ? (
                        //if logged in
                    <>
                         <li>
                            <Link href="/account/dashboard">
                                <a>Dashboard</a>
                            </Link>
                         </li>
                         <li>
                            <button className='btn-secondary btn-icon'
                            onClick={() => logout()}>
                                <FaSignOutAlt/>Logout
                            </button>
                         </li>
                         
                    </>
                    ):(
                        //if logged out
                        <>
                         <li>
                            <Link href='/account/login'>
                                <a className='btn-secondary btn-icon'>
                                    <FaSignInAlt/> Login</a>
                            </Link>
                         </li>
                        </>
                    )}
                   
                </ul>
            </nav>
        </header>
    )
}