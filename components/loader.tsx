import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import COLORS from "@/constants/colors";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={30} color={COLORS.primary} />
      <Text>Loading...</Text>
    </View>
  );
};

export default Loader;
