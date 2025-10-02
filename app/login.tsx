import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [isUsingUsername, setIsUsingUsername] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { logIn, logInWithUsername } = useAuth();

  const isFormValid = credential.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    try {
      if (isUsingUsername) {
        await logInWithUsername(credential.trim(), password.trim());
      } else {
        await logIn(credential.trim(), password.trim());
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 justify-center bg-background-light dark:bg-background-dark">
      <Text className="text-2xl mb-6 font-bold text-center">Iniciar Sesión</Text>

      <TouchableOpacity
        onPress={() => setIsUsingUsername(!isUsingUsername)}
        className="mb-4"
      >
        <Text className="text-blue-500 underline">
          {isUsingUsername ? "Usar correo en lugar de usuario" : "Usar usuario en lugar de correo"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder={isUsingUsername ? "Usuario o Email" : "Correo electrónico"}
        value={credential}
        onChangeText={setCredential}
        autoCapitalize="none"
        keyboardType={isUsingUsername ? "default" : "email-address"}
        className="border border-gray-400 rounded p-3 mb-4"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-400 rounded p-3 mb-4"
      />

      {error && <Text className="text-red-600 mb-4">{error}</Text>}

      <Button
        title={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        onPress={handleLogin}
        disabled={!isFormValid || loading}
        className="mb-4"
      />
    </View>
  );
}
