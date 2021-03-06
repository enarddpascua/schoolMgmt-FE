import { FaUser } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from '@/styles/AuthForm.module.css'
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, SetPassword] = useState('')
    const router = useRouter()
    const {login, error, user} = useContext(AuthContext)

    useEffect(() => {
        error && toast.error(error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error])

    useEffect(() => {
        user && router.push("/account/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
        

    const handleSubmit = (e) =>{
        e.preventDefault()
        login({email, password})
    }

    return(
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Log In
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password}
                        onChange={e => SetPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="Login" className="btn" />
                </form>
                <p>
                    Dont have an account?
                    <Link href="/account/register">Register</Link>
                </p>
            </div>
        </Layout>
    )
}