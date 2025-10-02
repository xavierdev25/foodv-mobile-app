import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Switch, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { request } from "@/lib/api";
import { getUserOrders } from "@/lib/api";

export default function Profile() {
  const { user, token, logOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.replace("/home");
  };

useEffect(() => {
  console.log("useEffect de orders ejecutado. token:", token);
  const loadOrders = async () => {
    try {
      if (!token) {
        console.log("No hay token, no se cargan pedidos.");
        return;
      }
      console.log("Llamando a getUserOrders...");
      const response = await getUserOrders(token);
      setOrders(response.data);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
    }
  };
  loadOrders();
}, [token]);

  return (
    <Container>
      <Header
        title="Tu perfil"
        showBack
        showProfile
        showCart
        cartCount={2}
      />

      {/* Info del usuario */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-black dark:text-white">
          {user?.name ?? "Nombre no disponible"}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          {user?.email ?? "Email no disponible"}
        </Text>
      </View>

      {/* Pedidos */}
      <Text className="text-base font-semibold mb-2 text-black dark:text-white">
        Pedidos recientes
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Text className="text-black dark:text-white">
              {item.deliveryMethod ?? "Pedido sin nombre"}
            </Text>
            <Text className="text-black dark:text-white">
              {item.paymentMethod ?? "Pedido sin nombre"}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Estado: {item.status ?? "Desconocido"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 dark:text-gray-400">
            No tienes pedidos recientes.
          </Text>
        }
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

// interface OrderItem {
//   id: number;
//   productId: number;
//   productName: string;
//   productImageUrl: string;
//   quantity: number;
//   unitPrice: number;
//   subtotal: number;
// }

// interface Order {
//   id: number;
//   status: string;
//   total: number;
//   deliveryMethod: string;
//   paymentMethod: string;
//   createdAt: string;
//   items: OrderItem[];
// }

// export default function Profile() {
//   const { user, logOut } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

// useEffect(() => {
//   const loadOrders = async () => {
//     try {
//       if (!user?.token) return;
//       const data = await getUserOrders(user.token);
//       setOrders(data);
//     } catch (err) {
//       console.error("Error cargando pedidos:", err);
//     }
//   };
//   loadOrders();
// }, [user]);

//   const handleLogout = () => {
//     logOut();
//     router.replace("/home");
//   };

//   return (
//     <Container>
//       <Header
//         title="Tu perfil"
//         showBack
//         showProfile
//         showCart
//       />

//       <View className="mb-6">
//         <Text className="text-lg font-bold text-black dark:text-white">
//           {user?.name ?? "Nombre no disponible"}
//         </Text>
//         <Text className="text-gray-600 dark:text-gray-300">
//           {user?.email ?? "Email no disponible"}
//         </Text>
//       </View>

//       <Text className="text-base font-semibold mb-2 text-black dark:text-white">
//         Pedidos recientes
//       </Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#10B981" />
//       ) : (
//         <FlatList
//           data={orders}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View className="p-3 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//               <Text className="text-black dark:text-white font-semibold">
//                 Pedido #{item.id}
//               </Text>
//               <Text className="text-sm text-gray-600 dark:text-gray-400">
//                 Estado: {item.status}
//               </Text>
//               <Text className="text-sm text-gray-600 dark:text-gray-400">
//                 Total: S/ {item.total}
//               </Text>
//               <Text className="text-xs text-gray-500 dark:text-gray-400">
//                 {new Date(item.createdAt).toLocaleString()}
//               </Text>
//             </View>
//           )}
//         />
//       )}

//       {/* Toggle modo oscuro */}
//       <View className="flex-row items-center justify-between mt-6">
//         <Text className="text-black dark:text-white">Modo oscuro</Text>
//         <Switch value={darkMode} onValueChange={setDarkMode} />
//       </View>

//       {/* Botón de cerrar sesión */}
//       <Pressable
//         className="mt-6 p-4 rounded-lg bg-negative-light dark:bg-negative-dark"
//         onPress={handleLogout}
//       >
//         <Text className="text-center text-white font-semibold">
//           Cerrar sesión
//         </Text>
//       </Pressable>
//     </Container>
//   );
// }
