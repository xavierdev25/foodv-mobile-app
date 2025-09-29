import React, { useState } from "react";
import { View, Text, FlatList, Switch, Pressable } from "react-native";
import { useRouter } from "expo-router";
//custom
import Container from "@/components/Container";
import Header from "@/components/Header";

const mockUser = {
  name: "Miguel Pérez",
  email: "miguelpe@ucvvirtual.edu.pe",
};

const mockOrders = [
  { id: "1", item: "Hamburguesa Clásica", status: "Entregado" },
  { id: "2", item: "Pizza Pepperoni", status: "En camino" },
  { id: "3", item: "Ensalada César", status: "Pendiente" },
];

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <Container layout="padded">
      <Header
        title="Tu perfil"
        showBack
        showProfile
        showCart
        cartCount={2}
      />

      <View className="mb-6">
        <Text className="text-lg font-bold text-black dark:text-white">
          {mockUser.name}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          {mockUser.email}
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
        onPress={() => console.log("Cerrar sesión")}
      >
        <Text className="text-center text-white font-semibold">
          Cerrar sesión
        </Text>
      </Pressable>
    </Container>
  );
}


// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Switch, Pressable, ActivityIndicator } from "react-native";
// import Container from "../components/Container";
// import Header from "../components/Header";

// interface User {
//   name: string;
//   email: string;
// }
// interface Order {
//   id: string;
//   item: string;
//   status: string;
// }

// export default function ProfileScreen() {
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const resUser = await fetch("https://api.midominio.com/user/me");
//         const dataUser = await resUser.json();
//         setUser(dataUser);

//         const resOrders = await fetch("https://api.midominio.com/user/orders");
//         const dataOrders = await resOrders.json();
//         setOrders(dataOrders);
//       } catch (err) {
//         console.error("Error cargando perfil", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <Container layout="centered">
//         <ActivityIndicator size="large" />
//       </Container>
//     );
//   }

//   return (
//     <Container layout="padded">
//       <Header title="Perfil" />

//       {user && (
//         <View className="mb-6">
//           <Text className="text-lg font-bold text-black dark:text-white">
//             {user.name}
//           </Text>
//           <Text className="text-gray-600 dark:text-gray-300">
//             {user.email}
//           </Text>
//         </View>
//       )}

//       <Text className="text-base font-semibold mb-2 text-black dark:text-white">
//         Pedidos recientes
//       </Text>
//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View className="p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//             <Text className="text-black dark:text-white">{item.item}</Text>
//             <Text className="text-sm text-gray-600 dark:text-gray-400">
//               Estado: {item.status}
//             </Text>
//           </View>
//         )}
//       />

//       {/* Toggle modo oscuro */}
//       <View className="flex-row items-center justify-between mt-6">
//         <Text className="text-black dark:text-white">Modo oscuro</Text>
//         <Switch
//           value={darkMode}
//           onValueChange={setDarkMode}
//         />
//       </View>

//       {/* Botón de cerrar sesión */}
//       <Pressable
//         className="mt-6 p-4 rounded-lg bg-negative-light dark:bg-negative-dark"
//         onPress={() => console.log("Cerrar sesión")}
//       >
//         <Text className="text-center text-white font-semibold">
//           Cerrar sesión
//         </Text>
//       </Pressable>
//     </Container>
//   );
// }


