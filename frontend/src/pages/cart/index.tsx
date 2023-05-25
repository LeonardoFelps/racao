import { useState } from 'react';
import { Header } from '@/components/Header';

type Product = {
  id: number;
  name: string;
  price: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Header />
      <div>
        <h1>Meu carrinho</h1>
        {cartItems.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - R$ {item.price.toFixed(2)}{' '}
                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
        <p>Total: R$ {calculateTotalPrice().toFixed(2)}</p>
      </div>
    </>
  );
};

export default Cart;

