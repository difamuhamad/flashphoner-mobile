import { View } from "react-native";
import Auth from "@/components/auth";
import Account from "@/components/account";
import { useAuth } from "@/lib/auth-context";

export default function Profile() {
  const { session } = useAuth();

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
