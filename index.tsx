import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "./auth/auth-store";
import { useEffect } from "react";

const { user, refreshUser } = useAuthStore();

useEffect(() => {
  refreshUser();
}, []);

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome? {user}</Text>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}
