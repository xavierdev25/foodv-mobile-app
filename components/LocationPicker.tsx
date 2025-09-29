import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface LocationPickerProps {
  onChange?: (location: { building: string; floor: string; room: string }) => void;
}

const LocationPicker = ({ onChange }: LocationPickerProps) => {
  const [building, setBuilding] = useState("A");
  const [floor, setFloor] = useState("1");
  const [room, setRoom] = useState("101");

  const handleChange = (newBuilding: string, newFloor: string, newRoom: string) => {
    onChange?.({ building: newBuilding, floor: newFloor, room: newRoom });
  };

  return (
    <View className="w-full my-4">
      <Text className="text-text-light dark:text-text-dark mb-2">Selecciona tu ubicación:</Text>

      {/* Pabellón */}
      <Picker
        selectedValue={building}
        onValueChange={(val) => {
          setBuilding(val);
          handleChange(val, floor, room);
        }}
      >
        <Picker.Item label="Pabellón A" value="A" />
        <Picker.Item label="Pabellón B" value="B" />
        <Picker.Item label="Pabellón C" value="C" />
      </Picker>

      {/* Piso */}
      <Picker
        selectedValue={floor}
        onValueChange={(val) => {
          setFloor(val);
          handleChange(building, val, room);
        }}
      >
        <Picker.Item label="Piso 1" value="1" />
        <Picker.Item label="Piso 2" value="2" />
        <Picker.Item label="Piso 3" value="3" />
      </Picker>

      {/* Aula */}
      <Picker
        selectedValue={room}
        onValueChange={(val) => {
          setRoom(val);
          handleChange(building, floor, val);
        }}
      >
        <Picker.Item label="Aula 101" value="101" />
        <Picker.Item label="Aula 202" value="202" />
        <Picker.Item label="Aula 305" value="305" />
      </Picker>
    </View>
  );
};

export default LocationPicker;
