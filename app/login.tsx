import  Container  from "@/components/Container";
import { View, Text } from "react-native";

export default function Login() {
  return (
    <Container layout="centered">
      <Text className="text-red-500 text-2xl font-bold text-primary">
        ¡Bienvenido a la nueva pantalla!
      </Text>
    </Container>
  );
}