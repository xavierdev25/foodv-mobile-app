import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
//customs
import StoreCard from "@/components/StoreCard";
import Header from "@/components/Header";
import Container from "@/components/Container";
import ThemedText from "@/components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();

  // Mock data
  const stores = [
    {
      id: "1",
      name: "Minimarket La Esquina",
      imageUrl:
        "https://via.placeholder.com/150/771796",
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
        showCart
        cartCount={2}
      />

      {/* Mensaje de bienvenida */}
      <View className="px-4 py-3">
        <ThemedText className="text-xl font-semibold">
          Bienvenido user
        </ThemedText>
        <ThemedText className="text-base text-neutral-600 dark:text-neutral-400">
          Haga su pedido
        </ThemedText>
      </View>

      {/* Lista de stores */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            name={store.name}
            imageUrl={store.imageUrl}
            category={store.category}
            onPress={() => router.push("/products")} 
          />
        ))}
      </ScrollView>
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, ActivityIndicator } from "react-native";
// import { useRouter } from "expo-router";
// import StoreCard from "../components/StoreCard";
// import Header from "../components/Header";

// export default function HomeScreen() {
//   const router = useRouter();
//   const [stores, setStores] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const res = await fetch("http://TU_BACKEND/api/stores");
//         const data = await res.json();
//         setStores(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Container>
//       <Header
//         title="Inicio"
//         showProfile
//         onProfilePress={() => router.push("/profile")}
//         showCart
//         cartCount={2}
//         onCartPress={() => router.push("/cart")}
//       />
//       <View className="px-4 py-3">
//         <Text className="text-xl font-semibold text-black dark:text-white">
//           Bienvenido user 👋
//         </Text>
//         <Text className="text-base text-neutral-600 dark:text-neutral-400">
//           Haga su pedido
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         {stores.map((store) => (
//           <StoreCard
//             key={store.id}
//             name={store.name}
//             imageUrl={store.imageUrl}
//             category={store.category}
//             onPress={() => router.push(`/products/${store.id}`)}
//           />
//         ))}
//       </ScrollView>
//     </Container>
//   );
// }
