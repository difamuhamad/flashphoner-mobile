import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/assets/styles/profile-styles";
import LogoutButton from "@/components/logout-button";
import ProfileHeader from "@/components/profile-header";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
};

export default Profile;
