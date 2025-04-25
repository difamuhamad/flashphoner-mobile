import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Dial", headerShown: false }}
      />
      <Stack.Screen
        name="add-contact"
        options={{ title: "Add Contact", headerShown: false }}
      />
    </Stack>
  );
};

export default _layout;
