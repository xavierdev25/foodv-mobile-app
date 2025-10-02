import React, { useState } from "react";
import { View, Text, FlatList, Switch, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
//custom
import Container from "@/components/Container";
import Header from "@/components/Header";
import Button from "@/components/Button";

const mockOrders = [
  { id: "1", item: "Hamburguesa Clásica", status: "Entregado" },
  { id: "2", item: "Pizza Pepperoni", status: "En camino" },
  { id: "3", item: "Ensalada César", status: "Pendiente" },
];

export default function Profile() {
  const { user, logOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.replace("/home");
  };

  return (
    <Container>
      <Header
        title="Tu perfil"
        showBack
        showProfile
        showCart
        cartCount={2}
      />

      <View className="mb-6">
        <Text className="text-lg font-bold text-black dark:text-white">
          {user?.name ?? "Nombre no disponible"}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          {user?.email ?? "Email no disponible"}
        </Text>
      </View>

      <Text className="text-base font-semibold mb-2 text-black dark:text-white">
        Pedidos recientes
      </Text>
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Text className="text-black dark:text-white">{item.item}</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Estado: {item.status}
            </Text>
          </View>
        )}
      />

      {/* Toggle modo oscuro */}
      <View className="flex-row items-center justify-between mt-6">
        <Text className="text-black dark:text-white">Modo oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      {/* Botón de cerrar sesión */}
      <Pressable
        className="mt-6 p-4 rounded-lg bg-negative-light dark:bg-negative-dark"
        onPress={handleLogout}
      >
        <Text className="text-center text-white font-semibold">
          Cerrar sesión
        </Text>
      </Pressable>
    </Container>
  );
}
