import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CartItemProps = {
  name: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  
}

const CartItem = ({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  
}: CartItemProps) => {
  
  return (
    <View className="flex-row items-center p-3 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800">

      {/* Nombre y precio */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-black dark:text-white">
          {name} 
        </Text>
        <Text className="text-gray-600 dark:text-gray-300">
          S/ {(price * quantity).toFixed(2)} ({quantity} × {price})
        </Text>
      </View>

      {/* Controles */}
      <View className="flex-row items-center">
        <Pressable
          onPress={onDecrease}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <Ionicons name="remove" size={18} color="#111" />
        </Pressable>

        <Text className="mx-2 text-black dark:text-white">{quantity}</Text>

        <Pressable
          onPress={onIncrease}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <Ionicons name="add" size={18} color="#111" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;
