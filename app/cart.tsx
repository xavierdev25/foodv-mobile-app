import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import Container from "@/components/Container";
import CartItem from "@/components/CartItem";

const mockCart = [
  {
    id: "1",
    name: "Manzana",
    price: 1.5,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/100x100.png?text=🍎",
  },
  {
    id: "2",
    name: "Pan",
    price: 0.8,
    quantity: 5,
    imageUrl: "https://via.placeholder.com/100x100.png?text=🥖",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCart);

  const handleIncrease = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container layout="padded">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">
        Carrito
      </Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            imageUrl={item.imageUrl}
            onIncrease={() => handleIncrease(item.id)}
            onDecrease={() => handleDecrease(item.id)}
          />
        )}
        className="mb-6"
      />

      <View className="items-end mb-4">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Total: S/ {total.toFixed(2)}
        </Text>
      </View>

      <Pressable className="bg-affirmative-light dark:bg-affirmative-dark py-3 rounded-lg">
        <Text className="text-center text-white font-bold text-lg">
          Confirmar Pedido
        </Text>
      </Pressable>
    </Container>
  );
};

export default Cart;

/*

import { useEffect, useState } from "react";
// import { fetchCart } from "@/services/cartApi"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart(); 
        setCartItems(data);
      } catch (error) {
        console.error("Error cargando carrito:", error);
      }
    };

    loadCart();
  }, []);

*/