import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router";

const PaymentSim = () => {
  const router = useRouter();

  const handleFinishPayment = () => {
    Alert.alert("Pago exitoso", "Tu pedido se ha realizado correctamente");
    router.replace("/home"); // vuelve al home y limpia navegación
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Header title="Pago" showBack={false} />
      <Text className="text-lg mb-6">Simulación de pago en Yape / Plin / Efectivo</Text>

      <Pressable
        onPress={handleFinishPayment}
        className="bg-affirmative-light py-3 rounded-lg mt-6"
      >
        <Text className="text-white font-bold">Pagar ahora</Text>
      </Pressable>
    </View>
  );
};

export default PaymentSim;
