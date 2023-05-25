import { FormEvent, useContext, useState } from "react"

import Head from "next/head"
import styles from '../styles/Home.module.scss'
import Image from "next/image"

import logoImg from '../../public/logo.png'

import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

import { AuthContext } from '../contexts/AdminContext'
import { toast } from 'react-toastify'

import { canSSRAdminGuest } from "@/utils/canSSRAdminGuest"

export default function Login() {
    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent){
        event.preventDefault();

        if(email === '' || password === ''){
            toast.warning('Preencha os dados')
            return;
        }

        setLoading(true)

        let data = {
            email,
            password
        }

        await signIn(data)

        setLoading(false)

    }

  return (
    <>
    <Head>
        <title>Administrativo - Faça seu login!</title>
    </Head>
    
        <div className={styles.containerCenter}>
            <Image src={logoImg} alt="Logo Pet Shop"/>

            <h1>Painel administrativo</h1>

            <div className={styles.login}>
                <form onSubmit={handleLogin}>
                    <Input
                        placeholder="Digite seu email"
                        type="text"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Sua senha"
                        type="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Acessar
                    </Button>
                </form>


            </div>

        </div>

    </>
  )
}

export const getServerSideProps =  canSSRAdminGuest(async (ctx) => {

    return {
        props: {}
    }
})

