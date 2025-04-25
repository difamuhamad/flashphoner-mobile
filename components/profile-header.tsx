import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/auth/auth-store";
import styles from "@/assets/styles/profile-styles";
import { Image } from "expo-image";
import Loader from "./loader";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

const ProfileHeader = () => {
  const { user, profile, isLoading } = useAuthStore();

  //   Avoid crashes when logout
  if (!user) return null;
  console.log(user);

  if (isLoading) return <Loader />;

  return (
    <View>
      <View style={styles.profileHeader}>
        {user.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../assets/images/profile_default.png")}
            style={styles.profileImage}
          />
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.username}>@ {profile.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.memberSince}>{profile.phone_number}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.editButon}
          onPress={() => router.push("/(tabs)/profile/edit-profile")}
        >
          <Ionicons name="create-outline" size={20} color={COLORS.white} />

          <Text style={styles.logoutText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
