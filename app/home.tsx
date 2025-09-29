import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import StoreCard from "@/components/StoreCard";
import Header from "@/components/Header";
import Container from "@/components/Container";

export default function HomeScreen() {
  const router = useRouter();

  // Mock data
  const stores = [
    {
      id: "1",
      name: "Minimarket La Esquina",
      imageUrl:
        "@/assets/images/icon.png",
      category: "minimarket",
    },
    {
      id: "2",
      name: "Emprendimiento Café Uni",
      imageUrl:
        "https://via.placeholder.com/150/771796",
      category: "universitario",
    },
    {
      id: "3",
      name: "Pastelería Doña Rosa",
      imageUrl:
        "https://via.placeholder.com/150/24f355",
      category: "emprendedor",
    },
  ];

  return (
    <Container>
      {/* Encabezado */}
      <Header
        title="Inicio"
        showProfile
        onProfilePress={() => router.push("/nuevo")}
        showCart
        cartCount={2}
        onCartPress={() => router.push("/nuevo")}
      />

      {/* Mensaje de bienvenida */}
      <View className="px-4 py-3">
        <Text className="text-xl font-semibold text-black dark:text-white">
          Bienvenido user 👋
        </Text>
        <Text className="text-base text-neutral-600 dark:text-neutral-400">
          Haga su pedido
        </Text>
      </View>

      {/* Lista de stores */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            name={store.name}
            imageUrl={store.imageUrl}
            category={store.category}
            onPress={() => router.push("/nuevo")} 
          />
        ))}
      </ScrollView>
    </Container>
  );
}
