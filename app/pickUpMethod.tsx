import { View, Text, Pressable } from "react-native";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Store , Bike} from "lucide-react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import OptionCard from "@/components/OptionCard";

export default function PickUpMethodScreen() {
  const router = useRouter();
  const { deliveryMethod, setDeliveryMethod } = useCheckoutStore();

  return (
    <Container>
      <Header title="Método de recogida" showBack />
      <View className="mt-4 px-4">
        <OptionCard
          label="Recoger en tienda"
          selected={deliveryMethod === "RECOGIDA_TIENDA"}
          onPress={() => setDeliveryMethod("RECOGIDA_TIENDA")}
          icon={Store}
        />
        <OptionCard
          label="Mini-delivery"
          selected={deliveryMethod === "MINI_DELIVERY"}
          onPress={() => setDeliveryMethod("MINI_DELIVERY")}
          icon={Bike}
        />

          <Pressable
          className="bg-affirmative-light py-3 rounded-lg mt-6"
          onPress={() => { router.push("/paymentMethod");}}
          >
          <Text className="text-white text-center font-bold">Continuar</Text>
        </Pressable>
      </View>
    </Container>
  );
}
