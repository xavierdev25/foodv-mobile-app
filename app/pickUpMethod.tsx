import React, { useState } from "react";
import { View, Text } from "react-native";
import { Bike, Store } from "lucide-react-native";
import { useRouter } from "expo-router";

//customs
import Header from "@/components/Header";
import Container from "@/components/Container";
import OptionCard from "@/components/OptionCard";
import Button from "@/components/Button";

// Acá tengo que aclarar, en caso me olvide, 
// que hay un Button de React Native pero que se importa aquí el custom que está en components

const PickUpMethod = () => {
  const router = useRouter();
  
  const [selected, setSelected] = useState<string | null>(null);

  // --- MOCK DATA ---
  const pickUpOptions = [
    { id: "inStore", label: "Recojo en tienda", icon: Store },
    { id: "miniDelivery", label: "Mini-Delivery", icon: Bike },
  ];

  return (
    <Container>
      <Header
        title="Método de entrega"
        showBack
        showProfile
        
      />
      <Text className="text-2xl font-bold mb-6 text-foreground">
        Selecciona un método de entrega para tu pedido
      </Text>

      {pickUpOptions.map((option) => (
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
              console.log("Método de recojo elegido:", selected);
                  router.push("/paymentMethod");
            } else {
              console.log("Debe elegir un método de recojo");
            }
          }}
        />
      </View>
    </Container>
  );
};

export default PickUpMethod;