import React, { useEffect } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { createOrder } from "@/lib/api";
import { useCheckoutStore } from "@/store/checkoutStore";


const CartScreen = () => {
  const router = useRouter();
  const { token } = useAuth(); // token desde el contexto/auth
  const { items, fetchCart, addOrUpdateItem, removeItem, clearCart } = useCartStore();
  const { reset } = useCheckoutStore();  // Reset en el store para limpiar datos cuando confirmamos el pedido

  console.log('Items en el carrito:', items);  // Verificamos que los datos estén completos

  // Traer carrito al montar (usa el token del auth)
  useEffect(() => {
    if (token) {
      fetchCart(token).catch((e) => console.error("fetchCart error:", e));
    }
  }, [token]);

  const total = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  return (
    <Container>
      <Header title="Carrito" showBack showProfile showCart />

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="cart-outline" size={64} color="#6B7280" />
          <Text className="text-gray-500 mt-4">Tu carrito está vacío</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                name={item.productName}
                price={item.productPrice}
                quantity={item.quantity}
                onIncrease={async () => {
                  if (!token) {
                    Alert.alert("Inicia sesión para modificar el carrito");
                    return;
                  }
                  await addOrUpdateItem(item.productId, item.quantity + 1, token);
                }}
                onDecrease={async () => {
                  if (!token) return;
                  await addOrUpdateItem(item.productId, Math.max(0, item.quantity - 1), token);
                }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />

          {/* Total y acciones */}
          <View className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Text className="text-lg font-semibold text-black dark:text-white mb-2">
              Total: S/ {total.toFixed(2)}
            </Text>

            {/* Botón para vaciar el carrito */}
            <Pressable
              onPress={async () => {
                try {
                  // store.clearCart() no espera args (usa token almacenado internamente)
                  await clearCart();
                } catch (e) {
                  Alert.alert("Error", "No se pudo vaciar el carrito.");
                }
              }}
              className="bg-gray-200 dark:bg-gray-700 py-3 rounded-lg items-center"
            >
              <Text className="text-gray-800 dark:text-gray-100 font-semibold">
                Vaciar carrito
              </Text>
            </Pressable>

            {/* Confirmación del pedido */}
            <Pressable
              onPress={async () => {
                if (!token) return; // No hay token, no podemos continuar
                try {
                  // En este punto, no creamos el pedido aún. Solo avanzamos en el flujo.
                  router.push("/pickUpMethod");  // Redirigimos a la pantalla de selección del método de entrega
                } catch (e) {
                  console.error("Error al confirmar el pedido", e);
                  Alert.alert("Error", "No se pudo confirmar el pedido.");
                }
              }}
              className="bg-green-600 py-3 rounded-lg items-center mt-3"
            >
              <Text className="text-white font-bold text-lg">Confirmar pedido</Text>
            </Pressable>
          </View>
        </>
      )}
    </Container>
  );
};

export default CartScreen;
