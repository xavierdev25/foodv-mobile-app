// app/deliveryLocation.tsx
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
//customs
import Container from "../components/Container";
import LocationCard from "../components/LocationCard";
import LocationPicker from "../components/LocationPicker";

const DeliveryLocation = () => {
  const router = useRouter();
   
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [customLocation, setCustomLocation] = useState<{
    building: string;
    floor: string;
    room: string;
  } | null>(null);

  const handleConfirm = () => {
    if (selectedLocation) {
      console.log("Ubicación seleccionada:", selectedLocation);
      router.push("/checkout")
    } else if (customLocation) {
      console.log("Ubicación personalizada:", customLocation);
    } else {
      console.log("No se ha seleccionado ninguna ubicación.");
    }
  };

  return (
    <Container layout="padded">
      <Text className="text-xl font-bold mb-4 dark:text-text-dark text-text-light">
        Selecciona tu ubicación de entrega
      </Text>

      {/* Ubicaciones guardadas (mock) */}
      <LocationCard
        label="Pabellón A - Piso 2 - Aula 203"
        selected={selectedLocation === "A-2-203"}
        onPress={() => setSelectedLocation("A-2-203")}
      />
      <LocationCard
        label="Pabellón C - Piso 1 - Aula 105"
        selected={selectedLocation === "C-1-105"}
        onPress={() => setSelectedLocation("C-1-105")}
      />

      <Text className="mt-4 mb-2 font-semibold dark:text-text-dark text-text-light">
        O ingresa una nueva ubicación:
      </Text>

      {/* Selector dinámico */}
      <LocationPicker onChange={(loc) => setCustomLocation(loc)} />

      {/* Botón confirmar */}
      <Pressable
        className="mt-6 bg-affirmative-light dark:bg-affirmative-dark rounded-xl p-4"
        onPress={handleConfirm}
      >
        <Text className="text-center text-white font-semibold">
          Confirmar ubicación
        </Text>
      </Pressable>
    </Container>
  );
};

export default DeliveryLocation;
