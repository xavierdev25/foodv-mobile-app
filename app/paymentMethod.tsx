import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useCheckoutStore } from "@/store/checkoutStore";
import { HandCoins, Wallet } from "lucide-react-native";

import Container from "@/components/Container";
import Header from "@/components/Header";
import OptionCard from "@/components/OptionCard";

export default function PaymentMethodScreen() {
  const router = useRouter();

  const { deliveryMethod, paymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <Container>
      <Header title="Método de pago" showBack />
      <View className="mt-4 px-4">
        <OptionCard
          label="Efectivo"
          selected={paymentMethod === "EFECTIVO"}
          onPress={() => setPaymentMethod("EFECTIVO")}
          icon={HandCoins}
        />
        <OptionCard
          label="Yape"
          selected={paymentMethod === "YAPE"}
          onPress={() => setPaymentMethod("YAPE")}
          icon={Wallet}
        />
          <OptionCard
          label="Plin"
          selected={paymentMethod === "PLIN"}
          onPress={() => setPaymentMethod("PLIN")}
          icon={Wallet}
        />

      <Pressable
        className="bg-affirmative-light py-3 rounded-lg mt-6"
        onPress={() => {
            if (deliveryMethod === "MINI_DELIVERY") {
              router.push("/deliveryLocation");
            } else {
              router.push("/checkout");
            }
          }}
      >
        <Text className="text-white text-center font-bold">Continuar</Text>
      </Pressable> 
      </View>
    </Container>
  );
}

