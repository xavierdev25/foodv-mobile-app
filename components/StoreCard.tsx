import React from "react";
import { View, Text, Image, Pressable } from "react-native";

type StoreCardProps = {
  name: string;
  imageUrl: string;
  type: string; // viene del backend
  onPress?: () => void;
};

// Map colores a tipos conocidos
const categoryColors: Record<string, string> = {
  MINIMARKET: "text-blue-600",
  DULCERÍA: "text-green-600",
  EMPRENDEDOR: "text-purple-600",
};

const StoreCard: React.FC<StoreCardProps> = ({ name, imageUrl, type, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4 mb-4 flex-row items-center"
    >
      <Image source={{ uri: imageUrl }} className="w-16 h-16 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-text-light dark:text-text-dark">
          {name}
        </Text>
        <Text
          className={`text-sm font-medium ${
            categoryColors[type?.toUpperCase()] || "text-gray-600"
          }`}
        >
          {type}
        </Text>
      </View>
    </Pressable>
  );
};

export default StoreCard;
