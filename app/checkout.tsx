import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import Container from "../components/Container";
import { useRouter } from "expo-router";

const mockCart = [
  { id: "1", name: "Galletas", price: 2.5, quantity: 2 },
  { id: "2", name: "Jugo", price: 3.0, quantity: 1 },
];

const mockPaymentMethod = "Efectivo";
const mockDeliveryLocation = "Pabellón A - Piso 2 - Aula 203";

const Checkout = () => {
  const router = useRouter();

  const total = mockCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleFinish = () => {
    console.log("Pedido confirmado!");
    router.push("/home");
    //mmc : tal vez añadir un toast
  };

  return (
    <Container layout="padded">
      <Text className="text-2xl font-bold mb-4 dark:text-text-dark text-text-light">
        Resumen del Pedido
      </Text>

      {/* Productos */}
      <FlatList
        data={mockCart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between mb-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <Text className="dark:text-text-dark text-text-light">
              {item.name} × {item.quantity}
            </Text>
            <Text className="dark:text-text-dark text-text-light">
              S/ {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />

      {/* Pago */}
      <View className="mt-4">
        <Text className="font-semibold dark:text-text-dark text-text-light">
          Método de pago:
        </Text>
        <Text className="dark:text-text-dark text-text-light">
          {mockPaymentMethod}
        </Text>
      </View>

      {/* Ubicación */}
      <View className="mt-4">
        <Text className="font-semibold dark:text-text-dark text-text-light">
          Entrega en:
        </Text>
        <Text className="dark:text-text-dark text-text-light">
          {mockDeliveryLocation}
        </Text>
      </View>

      {/* Total */}
      <View className="mt-6 flex-row justify-between">
        <Text className="text-lg font-bold dark:text-text-dark text-text-light">
          Total:
        </Text>
        <Text className="text-lg font-bold dark:text-text-dark text-text-light">
          S/ {total.toFixed(2)}
        </Text>
      </View>

      {/* Botón Finalizar */}
      <Pressable
        className="mt-8 bg-affirmative-light dark:bg-affirmative-dark rounded-xl p-4"
        onPress={handleFinish}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Finalizar Pedido
        </Text>
      </Pressable>
    </Container>
  );
};

export default Checkout;
