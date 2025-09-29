import React from "react";
import { View, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}
/*Tal vez en el futuro necesitaremos cn()*/

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    
    <View
      className="flex-1 items-center justify-center p-6 bg-background-light dark:bg-background-dark p-6 "
      {...props}
    >
      {children}
    </View>
  );
};
