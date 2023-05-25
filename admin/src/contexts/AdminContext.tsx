import { createContext, ReactNode, useState, useEffect } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try {
        destroyCookie(undefined, '@adminauth.token')
        Router.push('/')
    } catch{
        console.log('Erro ao deslogar')
    }
}

export function AdminProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@adminauth.token': token }= parseCookies();

        if(token){
            api.get('/admin/me').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                //se der erro o usuario será deslogado.
                signOut();
            })
        }

    }, [])

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/admin/session', {
                email,
                password
            })

            const {id, name, token} = response.data;

            setCookie(undefined, '@adminauth.token', token, {
                maxAge:60 * 60 * 24 * 30, // expirar em 1 mes
                path: "/"// caminhos que terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email
            })

            //passar para as proximas requisições o nosso token

            api.defaults.headers['Authorization'] = `Bearer ${token}` 

            toast.success('Logado com sucesso!')

            Router.push('/dashboard');

        } catch (err) {
            toast.error('Erro ao acessar')
            console.log("ERRO Ao ACESSAR ", err)
        }
    }


    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}