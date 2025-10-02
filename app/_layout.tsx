import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme, View, ActivityIndicator } from "react-native";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function AppStack() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Bienvenido" }} />
      <Stack.Screen name="login" options={{ title: "Iniciar Sesión" }} />
      <Stack.Screen name="register" options={{ title: "Registrarse" }} />
      <Stack.Screen name="home" options={{ title: "Inicio" }} />
      <Stack.Screen name="products" options={{ title: "Productos" }} />
      <Stack.Screen name="profile" options={{ title: "Perfil" }} />
      <Stack.Screen name="cart" options={{ title: "Carrito de Compra" }} />
      <Stack.Screen name="pickUpMethod" options={{ title: "Método de entrega" }} />
      <Stack.Screen name="paymentMethod" options={{ title: "Método de pago" }} />
      <Stack.Screen name="deliveryLocation" options={{ title: "Lugar de entrega" }} />
      <Stack.Screen name="checkout" options={{ title: "Verificar pedido" }} />
      {/* Más pantallas aquí */}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <AppStack />
        </SafeAreaView>
      </AuthProvider>
    </ThemeProvider>
  );
}
