import React, { useEffect } from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

// Custom components
import Button from "@/components/Button";
import Container from "@/components/Container";
import ThemedText from "@/components/ThemedText";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirige automáticamente si ya hay sesión
  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [loading, user]);

  if (loading) return null; // Evita parpadeo

  const handleRegister = () => {
    console.log("### Renderiza Registro.");
    router.push("/register");
  };

  const handleLogin = () => {
    console.log("### Renderiza Login.");
    router.push("/login");
  };

  return (
    <Container layout="centered">
      <ThemedText className="text-3xl font-bold mb-2">Bienvenido a Food V</ThemedText>
      <ThemedText className="text-center mb-8">
        Delivery de minimarkets del campus a tu aula o comedor.
      </ThemedText>

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
