import React from "react";
import { Pressable, Text } from "react-native";
import { tv } from "tailwind-variants";

const locationCard = tv({
  base: "rounded-xl border p-4 mb-3",
  variants: {
    selected: {
      true: "border-affirmative-light dark:border-affirmative-dark bg-affirmative-light/10 dark:bg-affirmative-dark/10",
      false: "border-gray-300 dark:border-gray-600 bg-transparent",
    },
  },
});

interface LocationCardProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const LocationCard = ({ label, selected = false, onPress }: LocationCardProps) => {
  return (
    <Pressable className={locationCard({ selected })} onPress={onPress}>
      <Text className="text-base dark:text-text-dark text-text-light">{label}</Text>
    </Pressable>
  );
};

export default LocationCard;
