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

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const { profile, isLoading, editProfile } = useAuthStore();

  useEffect(() => {
    const hasChanged =
      username !== profile.username ||
      phoneNumber !== profile.phone_number ||
      fullName !== profile.full_name;

    setIsChanged(hasChanged);
  }, [username, phoneNumber, fullName, profile]);

  if (!profile) return;
  useEffect(() => {
    if (profile.username) setUsername(profile.username);
    if (profile.phone_number) setPhoneNumber(profile.phone_number);
    if (profile.full_name) setFullName(profile.full_name);
  }, [profile]);

  const handleEditProfile = async () => {
    const updatedProfile = {
      ...profile, // same id and email
      username: username,
      phone_number: phoneNumber,
      full_name: fullName,
    };

    try {
      const result = await editProfile(updatedProfile, profile);
      if (result.success) {
        Alert.alert("Success", result.message);
        router.back();
      } else {
        // This is result if no changes detected
        Alert.alert("Success", result.message);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* Username input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="@username"
                  value={username}
                  onChangeText={setUsername}
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
            {/* Button */}
            <View>
              <TouchableOpacity
                style={[
                  styles.button,
                  (isLoading || !isChanged) && { opacity: 0.35 },
                ]}
                onPress={handleEditProfile}
                disabled={isLoading || !isChanged}
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

export default EditProfile;
