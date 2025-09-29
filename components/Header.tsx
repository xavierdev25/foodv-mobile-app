import React from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowLeft, ShoppingCart, User } from "lucide-react-native";

type HeaderProps = {
  title?: string;               // Nombre de la pantalla
  showBack?: boolean;           // Flecha para retroceder
  onBackPress?: () => void;
  showCart?: boolean;           // Ícono del carrito
  cartCount?: number;           // Numerito en el carrito
  onCartPress?: () => void;     
  showProfile?: boolean;        // Perfil
  onProfilePress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showCart = false,
  cartCount = 0,
  onCartPress,
  showProfile = false,
  onProfilePress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-background-light dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-700">

      <View className="flex-row items-center">
        {showBack && (
          <Pressable onPress={onBackPress} className="mr-3">
            <ArrowLeft size={24} color="black" />
          </Pressable>
        )}
        {title && (
          <Text className="text-lg font-semibold text-black dark:text-white">
            {title}
          </Text>
        )}
      </View>

      <View className="flex-row items-center space-x-4">
        {showCart && (
          <Pressable onPress={onCartPress} className="relative mr-3">
            <ShoppingCart size={24} color="black" />
            {cartCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">{cartCount}</Text>
              </View>
            )}
          </Pressable>
        )}
        {showProfile && (
          <Pressable onPress={onProfilePress}>
            <User size={24} color="black" />
          </Pressable>
        )}
      </View>
      
    </View>
  );
};

export default Header;
