import React from "react";
import { Pressable, Text, View } from "react-native";
import { tv } from "tailwind-variants";
import { LucideIcon, Wallet, Banknote } from "lucide-react-native";
/*Se usa tailwind-variants para manejar estilos condicionales selected true | selected false*/ 
const card = tv({
  base: "flex-row items-center p-4 rounded-2xl border mb-3",
  variants: {
    selected: {
      true: "border-primary bg-primary/10",
      false: "border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark",
    },
  },
});

interface OptionCardProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: LucideIcon;
}

const OptionCard = ({
  label,
  selected = false,
  onPress,
  icon: Icon = Wallet, // un icono por defecto
}: OptionCardProps) => {
  return (
    <Pressable className={card({ selected })} onPress={onPress}>
      <View className="mr-3">
        <Icon size={24} color={selected ? "#10B981" : "#6B7280"} />
      </View>
      <Text
        className={`text-base ${
          selected ? "text-primary font-semibold" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default OptionCard;
