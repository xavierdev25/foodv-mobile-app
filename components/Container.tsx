import React from "react";
import { View, ViewProps } from "react-native";
import { tv } from "tailwind-variants";

const container = tv({
  base: "flex-1 bg-background-light dark:bg-background-dark",
  variants: {
    layout: {
      default: "",
      centered: "items-center justify-center p-6",
      padded: "p-6",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  layout?: "default" | "centered" | "padded";
}

const Container = ({ children, layout, ...props }: ContainerProps) => {
  return (
    <View className={container({ layout })} {...props}>
      {children}
    </View>
  );
};

export default Container;
