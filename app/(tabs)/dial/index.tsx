import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/assets/styles/contacts-styles";
import ContactHeader from "@/components/contact-header";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

const Dial = () => {
  const contact = [
    {
      full_name: "Budiono Siregar",
      phone_number: "08123456789",
      profileImage:
        "https://images.unsplash.com/photo-1745432740829-da196b14a792?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      full_name: "Fulan bin fulan",
      phone_number: "08123456789",
      profileImage:
        "https://images.unsplash.com/photo-1745450432001-45171b79495e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      full_name: "Fulan bin fulan",
      phone_number: "08123456789",
      profileImage:
        "https://images.unsplash.com/photo-1744719256525-3deab6fd16ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const renderItem = ({ item }: { item: (typeof contact)[0] }) => (
    <ContactHeader contact={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Call List :</Text>
      {/* <FlatList data={contact} renderItem={renderItem} /> */}
      <View>
        <TouchableOpacity
          style={styles.editButon}
          onPress={() => router.push("/(tabs)/dial/add-contact")}
        >
          <Ionicons name="add-outline" size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Add New Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dial;
