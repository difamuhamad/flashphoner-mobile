import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/auth/auth-store";
import styles from "@/assets/styles/profile-styles";
import { Image } from "expo-image";
import Loader from "./loader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

interface ContactHeaderProps {
  contact: any;
}

const ContactHeader = ({ contact }: ContactHeaderProps) => {
  const { isLoading } = useAuthStore();

  if (isLoading) return <Loader />;

  return (
    <View>
      <View style={styles.profileHeader}>
        {contact.profileImage ? (
          <Image
            source={{ uri: contact.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../assets/images/profile_default.png")}
            style={styles.profileImage}
          />
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.username}>{contact.full_name}</Text>
          <Text style={styles.email}>{contact.phone_number}</Text>
        </View>
        <View style={styles.icon}>
          <Ionicons name="call-outline" size={25} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
};

export default ContactHeader;
