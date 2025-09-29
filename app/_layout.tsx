import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme(); // pregunta al celu si su modo es "light"|"dark"|null
  
  /*
  Pero el <theme provider> solo influye para cosas como encabezados que ni usamos, así que todo chill.
  */

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> 
    
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        
        <Stack  screenOptions={
            {
            headerShown: false,
            }
          }
        >  
          <Stack.Screen name="index" options={{ title: "Inicio" }} />
          <Stack.Screen name="nuevo" options={{ title: "Bienvenido" }} />





        </Stack>

      </SafeAreaView>
    </ThemeProvider>
  );
}
