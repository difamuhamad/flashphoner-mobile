import { View, Text } from "react-native";
import React from "react";
import styles from "@/assets/styles/home-styles";
import { Image } from "expo-image";

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/2.png")}
          style={styles.illustrationImage}
        />
        <Text style={styles.headerTitle}>Flashphoner Mobile</Text>
        <Text style={styles.headerSubtitle}>Next, what should i do??</Text>
      </View>
    </View>
  );
};

export default Index;
