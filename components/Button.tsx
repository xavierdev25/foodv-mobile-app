import React from "react";
import { Pressable, Text, GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: "affirmative" | "negative" | "tertiary"; //continuar/sí, atrás/no, y el 'primario' que de primario no tiene nada y por eso lo llamé terciario xd

  disabled?: boolean;
  className?: string; 
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "affirmative",
  disabled = false,
  className,
}) => {
  const base =
    "w-full py-3 rounded-lg items-center justify-center";

  let bgClass = "";
  let textClass = "text-lg font-semibold";

  switch (variant) {
    case "affirmative":
      bgClass = "bg-affirmative-light dark:bg-affirmative-dark";
      textClass += " text-text-light dark:text-text-dark";
      break;
    case "negative":
      bgClass = "bg-negative-light dark:bg-negative-dark";
      textClass += " text-text-light dark:text-text-dark";
      break;
    case "tertiary":
      bgClass = "bg-tertiary-light dark:bg-tertiary-dark";
      textClass += " text-text-light dark:text-text-dark";
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${base} ${bgClass} ${disabled ? "opacity-50" : ""} ${className ?? ""} 
      `}
    >
      <Text className={textClass}>{title}</Text>
    </Pressable>
  );
};

export default Button;