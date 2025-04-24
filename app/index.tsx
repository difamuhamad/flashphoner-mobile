import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View>
      <Text>Index</Text>
      <Link href={"/(auth)"}>Login Page</Link>
      <Link href={"/(auth)/signup"}>Signup Page</Link>
    </View>
  );
};

export default Index;
