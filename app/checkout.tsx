import React, { useState } from "react";
import { View, Text, Pressable, Alert, ScrollView, TextInput } from "react-native";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/lib/api";
import Header from "@/components/Header";
import { useRouter } from "expo-router";

const CheckoutScreen = () => {
  const router = useRouter();

  const { items, token, clearCart } = useCartStore();
  const { deliveryMethod, location, paymentMethod, notes, setNotes, reset } = useCheckoutStore();

  const total = items.reduce((sum, i) => sum + i.productPrice * i.quantity, 0);

  const handleConfirm = async () => {
    if (!deliveryMethod) return Alert.alert("Atención", "Selecciona un método de entrega.");
    if (deliveryMethod === "MINI_DELIVERY" && !location)
      return Alert.alert("Atención", "Selecciona una ubicación de entrega.");
    if (!paymentMethod) return Alert.alert("Atención", "Selecciona un método de pago.");

    try {
      const requestBody = {
        deliveryMethod,
        paymentMethod,
        notes,
        pabellon: location?.building ?? "",
        piso: location?.floor ?? "",
        salon: location?.room ?? "",
      };

      await createOrder(requestBody, token!); 
      await clearCart(); // vacía carrito local y backend si aplica
      reset();
      router.push("/paymentSim");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo completar el pedido.");
    }
  };

  return (
    <ScrollView>
      <Header title="Resumen del pedido" showBack />
      <View className="p-4 space-y-4">
        <Text className="text-lg font-semibold">Productos</Text>
        {items.map((item) => (
          <View key={item.productId} className="flex-row justify-between">
            <Text>{item.productName} x {item.quantity}</Text>
            <Text>S/ {item.productPrice * item.quantity}</Text>
          </View>
        ))}

        <Text className="text-lg font-semibold mt-4">Detalles del pedido</Text>
        <Text>Método de entrega: {deliveryMethod}</Text>
        {deliveryMethod === "MINI_DELIVERY" && location && (
          <Text>Ubicación: {location.building} - {location.floor} - {location.room}</Text>
        )}
        <Text>Método de pago: {paymentMethod}</Text>

        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notas adicionales..."
          className="border p-2 rounded"
        />

        <Text className="text-lg font-bold mt-4">Total: S/ {total.toFixed(2)}</Text>

        <Pressable
          onPress={handleConfirm}
          className="bg-affirmative-light py-3 rounded-lg mt-6"
        >
          <Text className="text-white text-center font-bold">Confirmar pedido</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;
