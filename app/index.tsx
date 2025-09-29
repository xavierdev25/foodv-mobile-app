import React from "react";
import "../global.css";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
//customs
import { Button } from "../components/Button";
import { Container } from "@/components/Container";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  const handleRegister = () => {
    console.log("### Renderiza Registro.");

    router.push("/nuevo");
  };

  const handleLogin = () => {
    console.log("### Renderiza Login.");

    router.push("/nuevo");
  };

  return (
    <Container>
      {/*Tal vez en el futuro necesitaremos cn()*/}
      <Text className="text-3xl font-bold mb-2">Bienvenido a Food V</Text>
      <Text className="text-center mb-8">
        Delivery de minimarkets del campus a tu aula o comedor.
      </Text>
      <Button
        title="Registrarse con teléfono"
        onPress={handleRegister}
        variant="tertiary"
        className="mb-3 w-full"
      />
      <Button
        title="Ya tengo cuenta"
        onPress={handleLogin}
        variant="tertiary"
        className="w-full"
      />
      <StatusBar style="auto" />
    </Container>
  );
};

export default WelcomeScreen;
