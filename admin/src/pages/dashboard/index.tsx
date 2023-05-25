import Head from "next/head"
import { canSSRAdminAuth } from "@/utils/canSSRAdminAuth"

import styles from './styles.module.scss'

import { Header } from "@/components/Header"
import { FiRefreshCcw } from "react-icons/fi"

import { setupAPIClient } from "@/services/api"
import { useState } from 'react'

import { ModalOrder } from "@/components/ModalOrder"

import Modal from "react-modal"

type OrderProps = {
  id: string;
  purchase_order: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    purchase_order: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  
  const [modalItem, setModalitem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail', {
      params:{
        order_id: id,
      }
    })

    setModalitem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish',{
      order_id: id,
    })
    const response = await apiClient.get('/orders');

    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/orders')
    setOrderList(response.data);
  }

  Modal.setAppElement('#__next')

  return (
    <>
    <Head>
        <title>Painel administrativo - Home!</title>
    </Head>
    
      <div>
        <Header/>
        
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders} >
              <FiRefreshCcw size={25} color='#005eff' />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList} >
                Nenhum pedido foi encontrado...
              </span>
            )}

          {orderList.map( item => (

            <section key={item.id} className={styles.orderItem}>
              <button onClick={ () => handleOpenModalView(item.id)}>
                <div className={styles.tag}></div>
                <span>Pedido {item.purchase_order}</span>
              </button>
            </section>
          ))}
          </article>
        </main>

        { modalVisible &&(

          <ModalOrder 
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={ handleFinishItem }
          />
        )}

      </div>

    </>
  )
}

export const getServerSideProps = canSSRAdminAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  //console.log(response.data);

  return{
      props:{
        orders: response.data
      }
  }
})


