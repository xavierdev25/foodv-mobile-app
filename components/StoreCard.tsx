import React from "react";
import { View, Text, Image, Pressable } from "react-native";

type StoreCardProps = {
  name: string;
  imageUrl: string;
  category: string;
  onPress?: () => void;
};

const categoryColors: Record<string, string> = {
  minimarket: "text-blue-600",
  quiosco: "text-green-600",
  emprendedor: "text-purple-600",
};

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  imageUrl,
  category,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4 mb-4 flex-row items-center"
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-16 h-16 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-black dark:text-white">
          {name}
        </Text>
        <Text
          className={`text-sm font-medium ${
            categoryColors[category] || "text-gray-600"
          }`}
        >
          {category}
        </Text>
      </View>
    </Pressable>
  );
};

export default StoreCard;
