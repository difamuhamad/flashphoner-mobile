import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "@/assets/styles/signup-styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { useAuthStore } from "@/auth/auth-store";
import { router } from "expo-router";

const AddContact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const { isLoading, findUser, addNewContact } = useAuthStore();

  const handleAddContact = async () => {
    const newContact = await findUser(phoneNumber);
    if (!newContact.success) {
      Alert.alert("Error", newContact.message);
      return;
    }
    const result = await addNewContact(
      newContact.data.userId,
      phoneNumber,
      fullName
    );
    if (!result.success) {
      Alert.alert("Error", result.message);
    }
    Alert.alert("Success", result.message);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name :</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="text-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* Phone number input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number :</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* Button */}
            <View>
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleAddContact}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Save</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.back()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddContact;
