import { Text, TextProps } from "react-native";

export default function ThemedText({ className, ...props }: TextProps) {
  return (
    <Text
      className={`text-text-light dark:text-text-dark ${className}`}
      {...props}
    />
  );
}
