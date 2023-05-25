import Head from "next/head";
import { canSSRGuest } from "@/utils/canSSRGuest";
import styles from '../styles/styles.module.scss';
import { Header } from "@/components/Header";
import { setupAPIClient } from "@/services/api";
import { useEffect, useState } from "react";
import { api } from "@/services/apiClient";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  banner: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [carrinho, setCarrinho] = useState<Product[]>([]);

  const adicionarAoCarrinho = (produto: Product) => {
    setCarrinho((carrinho) => [...carrinho, produto]);
  };

  useEffect(() => {
    async function loadProdutos() {
      setIsLoading(true);
      const response = await api.get("/product");
      setProdutos(response.data);
      setIsLoading(false);
    }
    loadProdutos();
  }, []);

  return (
    <>
      <Head>
        <title>Rações - Painel!</title>
      </Head>
      <Header carrinho={carrinho} adicionarAoCarrinho={adicionarAoCarrinho} />
      <div className={styles.container}>
        {isLoading && <div className={styles.loading}>Carregando...</div>}
        <div className={styles.listProduct}>
          {produtos.map((product) => (
            <button key={product.id} onClick={() => adicionarAoCarrinho(product)}>
              <img src={`http://localhost:3333/files/${product.banner}`} width={180} height={180} />
              <span className={styles.produto}>{product.name}</span>
              <span>{product.description}</span>
              <span className={styles.price}>R$ {product.price}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
