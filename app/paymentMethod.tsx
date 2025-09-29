import React, { useState } from "react";
import { View, Text } from "react-native";
import { Banknote, Wallet } from "lucide-react-native";
import { useRouter } from "expo-router";

//customs
import Header from "@/components/Header";
import Container from "@/components/Container";
import OptionCard from "@/components/OptionCard";
import Button from "@/components/Button";

// Acá tengo que aclarar, en caso me olvide, 
// que hay un Button de React Native pero que se importa aquí el custom que está en components

const PaymentMethod = () => {
  const router = useRouter();
  
  const [selected, setSelected] = useState<string | null>(null);

  // --- MOCK DATA ---
  const paymentOptions = [
    { id: "cash", label: "Efectivo", icon: Banknote },
    { id: "yape", label: "Yape / Plin", icon: Wallet },
  ];

  return (
    <Container>
      <Header
        title="Método de pago"
        showBack
        showProfile
        
      />
      <Text className="text-2xl font-bold mb-6 text-foreground">
        Selecciona un método de pago
      </Text>

      {paymentOptions.map((option) => (
        <OptionCard
          key={option.id}
          label={option.label}
          icon={option.icon}
          selected={selected === option.id}
          onPress={() => setSelected(option.id)}
        />
      ))}

      <View className="mt-8">
        <Button 
          variant="affirmative"
          title="Continuar"
          onPress={() => {
            if (selected) {
              console.log("Método de pago elegido:", selected);
                  router.push("/deliveryLocation"); //MMC: Lógica . iría un condicional
            } else {
              console.log("Debe elegir un método de pago");
            }
          }}
        />
      </View>
    </Container>
  );
};

export default PaymentMethod;

/*
// Ejemplo de request al backend (pseudocódigo)
const { data: paymentOptions } = useQuery(["payment-methods"], fetchPaymentMethods);

// Donde fetchPaymentMethods llamaría a tu endpoint, y este retorna:
[
  { id: "cash", label: "Efectivo" },
  { id: "yape", label: "Yape / Plin" },
  { id: "card", label: "Tarjeta" },
]

*/