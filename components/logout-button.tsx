import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useAuthStore } from "@/auth/auth-store";
import styles from "@/assets/styles/profile-styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

const LogoutButton = () => {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure want to logout this account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />

      <Text style={styles.logoutText}>Logout</Text>
      <View></View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
