import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
//customs
import Container from "@/components/Container";
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import  Button from "@/components/Button";

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
  const router = useRouter();
  
  const [cartItems, setCartItems] = useState(mockCart);
  
  const handleConfirm = () => {
    console.log("### Renderiza el inicio del checkout.");

    router.push("/pickUpMethod");
  };
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
    <Container>
      <Header
        title="Carrito"
        showBack
        showProfile
      />

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

      <Button 
      variant="affirmative" 
      title="Confirmar Pedido"
      onPress={handleConfirm}
      >
      </Button>
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