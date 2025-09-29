import React from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, Pressable } from "react-native";

//customs
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Header from "@/components/Header";

const mockProducts = [
  {
    id: "1",
    name: "Hamburguesa Clásica",
    price: 15,
    image: "https://via.placeholder.com/150/771796",
  },
  {
    id: "2",
    name: "Pizza Pepperoni",
    price: 22,
    image: "https://via.placeholder.com/150/24f355",
  },
  {
    id: "3",
    name: "Ensalada César",
    price: 12,
    image: "https://via.placeholder.com/150/d32776",
  },
    {
    id: "4",
    name: "Hamburguesa Clásica",
    price: 15,
    image: "https://via.placeholder.com/150/771796",
  },
  {
    id: "5",
    name: "Pizza Pepperoni",
    price: 22,
    image: "https://via.placeholder.com/150/24f355",
  },
  {
    id: "6",
    name: "Ensalada César",
    price: 12,
    image: "https://via.placeholder.com/150/d32776",
  },
    {
    id: "7",
    name: "Pizza Pepperoni",
    price: 22,
    image: "https://via.placeholder.com/150/24f355",
  },
  {
    id: "8",
    name: "Ensalsada César",
    price: 12,
    image: "https://via.placeholder.com/150/d32776",
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  
  return (
    <Container >
      <Header
        title="Productos"
        showBack
        showProfile
        showCart
        cartCount={2}
      />
      <View className="flex-row items-center mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <Ionicons name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Buscar productos..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-2 text-black dark:text-white"
        />
        <Pressable onPress={() => console.log("Filtros")}>
          <Ionicons name="options-outline" size={22} color="#6B7280" />
        </Pressable>
      </View>
      <FlatList
        data={mockProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            image={item.image}
            initialQuantity={0}
            onChangeQuantity={(q) =>
              console.log(`Producto ${item.id}, nueva cantidad: ${q}`)
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </Container>
  );
}

/*
// app/products.tsx
import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import { useLocalSearchParams } from "expo-router"; // para obtener el storeId de la ruta

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductsScreen() {
  const { storeId } = useLocalSearchParams(); // /products?storeId=123
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://api.midominio.com/stores/${storeId}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeId]);

  if (loading) {
    return (
      <Container layout="centered">
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container layout="padded">
      <Header title="Productos" />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            image={item.image}
            initialQuantity={0}
            onChangeQuantity={(q) =>
              console.log(`Producto ${item.id}, nueva cantidad: ${q}`)
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </Container>
  );
}

*/