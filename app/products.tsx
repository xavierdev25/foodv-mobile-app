import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
// customs
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/store/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setProducts(
            data.data.map((p: Product) => ({
              ...p,
              imageUrl: p.imageUrl || "https://via.placeholder.com/150/771796",
            }))
          );
        }
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) fetchProducts();
  }, [storeId, token]);

  return (
    <Container>
      <Header title="Productos" showBack showProfile showCart cartCount={2} />

      {/* Barra de búsqueda (no funcional todavía) */}
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
              name={item.name}
              price={Number(item.price)} // viene como BigDecimal
              image={item.imageUrl}
              initialQuantity={0}
              onChangeQuantity={(q) =>
                console.log(`Producto ${item.id}, nueva cantidad: ${q}`)
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </Container>
  );
}
