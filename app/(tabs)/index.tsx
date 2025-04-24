import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { images } from "@/constants/images";

const Index = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image source={images.mainLogo} className="w-8 z-0 self-center" />
      <ScrollView
        className="flex-1 w-full px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full items-center">
          <Text className="text-center">Home Page Test</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
