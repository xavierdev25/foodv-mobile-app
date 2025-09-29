import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { tv } from "tailwind-variants";

const productItem = tv({
  base: "flex-row items-center bg-white dark:bg-background-dark rounded-2xl shadow p-4 m-2",
});

interface ProductItemProps {
  image: string; 
  name: string;
  price: number;
  initialQuantity?: number;
  onChangeQuantity?: (q: number) => void;
}

const ProductItem = ({ image, name, price, initialQuantity = 0, onChangeQuantity }: ProductItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    onChangeQuantity?.(newValue);
  };

  const handleDecrease = () => {
    const newValue = Math.max(0, quantity - 1);
    setQuantity(newValue);
    onChangeQuantity?.(newValue);
  };

  const handleChangeText = (text: string) => {
    const parsed = parseInt(text, 10);
    const newValue = isNaN(parsed) ? 0 : parsed;
    setQuantity(newValue);
    onChangeQuantity?.(newValue);
  };

  return (
    <View className={productItem()}>
      {/* Imagen */}
      <Image
        source={{ uri: image }}
        className="w-16 h-16 rounded-lg mr-4"
        resizeMode="cover"
      />

      {/* Contenido */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-foreground-light dark:text-foreground-dark">
          {name}
        </Text>
        <Text className="text-base font-bold text-primary">${price}</Text>

        {/* Controles de cantidad */}
        <View className="flex-row items-center mt-2">
          {/* Botón - */}
          <Pressable
            onPress={handleDecrease}
            className="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 items-center justify-center"
          >
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">-</Text>
          </Pressable>

          {/* Input cantidad */}
          <TextInput
            value={String(quantity)}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            className="mx-3 w-16 h-9 leading-3 text-center border border-gray-300 dark:border-gray-600 rounded"
              style={{
                fontSize: 13, // Ajusta el tamaño de la fuente según sea necesario
              }}
          />

          {/* Botón + */}
          <Pressable
            onPress={handleIncrease}
            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
