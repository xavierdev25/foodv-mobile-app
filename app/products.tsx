import React, { useState, useEffect } from "react";
import {  View, TextInput, FlatList, ActivityIndicator, Pressable, Text,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

import { getProductsByStoreId } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cartStore";
import ProductItem from "@/components/ProductItem";
import Container from "@/components/Container";
import Header from "@/components/Header";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  storeId: number;
  storeName: string;
  createdAt: string;
};

export default function ProductsScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { items, addOrUpdateItem } = useCartStore();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByStoreId(storeId);
        const productList = response.data;

        setProducts(
          productList.map((p: Product) => ({
            ...p,
            imageUrl: p.imageUrl || "https://via.placeholder.com/150/771796",
          }))
        );
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) fetchProducts();
  }, [storeId]);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    if (!token) return;
    try {
      await addOrUpdateItem(productId, quantity, token);
    } catch (error) {
      console.error("Error actualizando carrito:", error);
    }
  };

  return (
    <Container>
      <Header title="Productos" showBack showProfile showCart />

      {/* Barra de búsqueda */}
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

      {/* Lista de productos */}
      {loading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={Number(item.price)}
              image={item.imageUrl}
              initialQuantity={items.find((i) => i.productId === item.id)?.quantity || 0}
              onChangeQuantity={handleQuantityChange}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </Container>
  );
}
