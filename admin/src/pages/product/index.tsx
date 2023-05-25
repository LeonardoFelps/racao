
import Head from "next/head";
import styles from './styles.module.scss'

import { canSSRAdminAuth } from "@/utils/canSSRAdminAuth"
import { Header } from "@/components/Header";

import { FiUpload } from "react-icons/fi";
import { ChangeEvent, useState, FormEvent } from "react";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){
    
    const [name, setName] = useState('');
    const [price, SetPrice] = useState('');
    const [description, setDescription] = useState('');
    
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jeg' || image.type === 'image/png'){

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }

    }

    function handleChangeCategory(event){

        setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        try {
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error("Preencha todos os campos");
                return;
            }

            data.append('name', name);
            data.append('price',price);
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success("Produto cadastrado com sucesso!")
            
        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar!")
        }

       setName('');
       SetPrice('');
       setDescription('');
       setImageAvatar(null);
       setAvatarUrl('');
       
    }

    return(
        <>
        <Head>
            <title>Painel administrativo - Produtos</title>
        </Head>
        <div>
            <Header/>

            <main className={styles.container}>
                <h1>Novo produto</h1>
            

                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>

                        <span>
                            <FiUpload size={30} color="#000" />
                        </span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                        {avatarUrl && (
                            <img 
                            className={styles.preview}
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                            />
                        )}
                    
                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map( (item, index) => {
                            return(
                                <option key={item.id} value={index} >
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <input
                    type="text"
                    placeholder="Digite o nome do produto" 
                    className={styles.input}
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />

                    <input
                    type="text"
                    placeholder="Preço do produto" 
                    className={styles.input}
                    value={price}
                    onChange={(e)=> SetPrice(e.target.value)}
                    />

                    <textarea
                    placeholder="Descreva seu produto..."
                    className={styles.input}
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />

                    <button className={styles.buttonAdd}>
                        Cadastrar
                    </button>

                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAdminAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    

    return{
        props:{
            categoryList: response.data
        }
    }
  })