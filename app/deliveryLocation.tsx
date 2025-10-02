import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useCheckoutStore } from "@/store/checkoutStore";
import Container from "@/components/Container";
import Header from "@/components/Header";
import LocationCard from "@/components/LocationCard";
import LocationPicker from "@/components/LocationPicker";
import { Picker } from "@react-native-picker/picker";
import { campusMap } from "@/lib/campusMap";


const DeliveryLocationScreen = () => {
  const router = useRouter();
  const { location, setLocation } = useCheckoutStore();
  
  const [building, setBuilding] = useState(location?.building || "A");
  const [floor, setFloor] = useState(
    location?.floor || campusMap["A"].pisos[0].toString()
  );
  const [room, setRoom] = useState(
    location?.room || campusMap["A"].aulas[floor][0]
  );

  // Reset piso y aula si cambia el pabellón
  useEffect(() => {
    const pisos = campusMap[building].pisos;
    setFloor(pisos[0].toString());
    setRoom(campusMap[building].aulas[pisos[0]][0]);
  }, [building]);

  // Reset aula si cambia el piso
  useEffect(() => {
    const aulas = campusMap[building].aulas[floor];
    setRoom(aulas[0]);
  }, [floor, building]);

  const handleContinue = () => {
    if (!building || !floor || !room) {
      Alert.alert("Atención", "Por favor selecciona tu ubicación completa.");
      return;
    }
    setLocation({ building, floor, room });
    router.push("/checkout");
  };

  return (
    <Container>
      <Header title="Dirección de entrega" showBack />

      <View className="mt-6 px-4">
        <Text className="text-base text-black dark:text-white mb-2">
          Selecciona tu ubicación:
        </Text>

        {/* Pabellones */}
        <Picker
          selectedValue={building}
          onValueChange={(val) => setBuilding(val)}
        >
          {Object.keys(campusMap).map((b) => (
            <Picker.Item key={b} label={`Pabellón ${b}`} value={b} />
          ))}
        </Picker>

        {/* Pisos */}
        <Picker
          selectedValue={floor}
          onValueChange={(val) => setFloor(val)}
        >
          {campusMap[building].pisos.map((p) => (
            <Picker.Item key={p} label={`Piso ${p}`} value={p.toString()} />
          ))}
        </Picker>

        {/* Aulas */}
        <Picker
          selectedValue={room}
          onValueChange={(val) => setRoom(val)}
        >
          {campusMap[building].aulas[floor].map((a) => (
            <Picker.Item key={a} label={`Aula ${a}`} value={a} />
          ))}
        </Picker>

        <Pressable
          onPress={handleContinue}
          className="bg-affirmative-light py-3 rounded-lg mt-6"
        >
          <Text className="text-white text-center font-bold">Continuar</Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default DeliveryLocationScreen;
