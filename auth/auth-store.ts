import { supabase } from "@/lib/supabase";
import { AuthStore, Profile, Result } from "@/types/types";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  token: undefined,
  isLoading: false,
  email: null,
  password: null,
  isCheckingAuth: true,

  //   Register function (supabase)
  register: async (username, email, password) => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error || !data.user) {
        console.log(error, error?.message);
        throw new Error(
          error?.message || "Signup failed, please try again later"
        );
      }

      // Insert to db users with the same id
      const { error: insertError } = await supabase
        .from("mobile_profiles")
        .insert({
          id: data.user.id,
          username: username,
          email: data.user.email,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Token will automatically saved to LargeSecureStore by supabase in lib/supabase.ts
      const token = data.session?.access_token;

      set({
        token,
        user: data.user,
        isLoading: false,
      });
      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  //   Sign In function (supabase)
  signIn: async (email, password) => {
    try {
      set({ isLoading: true });

      if (!email || !password) {
        throw new Error("Email dan password must be filled!");
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user)
        throw new Error("Sign in failed, create your account first");

      const { data: profile, error: profileError } = await supabase
        .from("mobile_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError)
        throw new Error("Sign in failed, create your account first");

      set({
        user: data.user,
        token: data.session?.access_token,
        profile,
        isLoading: false,
      });

      return { success: true };
    } catch (err: any) {
      set({ isLoading: false });
      return { success: false, error: err.message };
    }
  },

  // Find user profiles
  findUser: async (phone_number: string) => {
    try {
      let { data: mobile_profiles, error } = await supabase
        .from("mobile_profiles")
        .select("*")
        .eq("phone_number", phone_number);
      if (!mobile_profiles || error) {
        return { success: false, message: "User not found", data: null };
      }
      return { success: true, message: "User found", data: mobile_profiles };
    } catch (error) {
      return { success: false, message: "Error fetching data", data: null };
    }
  },
  //   Get the user data while opening the app
  refreshUser: async () => {
    try {
      const { data: authData, error } = await supabase.auth.getUser();

      if (!error && authData?.user) {
        const session = await supabase.auth.getSession();

        // Ambil profile user dari tabel `mobile_profiles`
        const { data: profile, error: profileError } = await supabase
          .from("mobile_profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single(); // Karena hanya satu user

        if (profileError) throw new Error(profileError.message);

        set({
          user: authData.user,
          token: session.data.session?.access_token,
          profile,
        });
        return { success: true, message: "Successfully fetch user data" };
      } else {
        set({ user: null, token: undefined, profile: undefined });
      }
      return { success: false, message: "Failed to fetch user data" };
    } catch (err) {
      set({ user: null, token: undefined, profile: undefined });
      return { success: false, message: "Failed to fetch user data" };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //   Logout function
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, token: undefined });
  },

  //  Edit function
  editProfile: async (profile: Profile, original: Profile): Promise<Result> => {
    const changes: Partial<Profile> = {};

    if (profile.username !== original.username)
      changes.username = profile.username;
    if (profile.full_name !== original.full_name)
      changes.full_name = profile.full_name;
    if (profile.phone_number !== original.phone_number)
      changes.phone_number = profile.phone_number;

    // Check if some value is changed
    if (Object.keys(changes).length > 0) {
      const { data, error } = await supabase
        .from("mobile_profiles")
        .update(changes)
        .eq("id", profile.id);

      if (error) return { success: false, message: error.message };

      // Update store
      set((state) => ({ profile: { ...state.profile, ...changes } }));
      return { success: true, message: "Profile updated successfully" };
    }

    // Jika tidak ada perubahan, tetap return success
    return { success: false, message: "No changes detected" };
  },

  // Add Contact
  addNewContact: async (phone_number, full_name) => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ phone_number, full_name }])
        .select("*");
      if (!data || error) {
        return { success: false, message: error };
      }
      return { success: true, message: "Contact has been saved" };
    } catch (error) {
      return { success: false, message: "Error saving contact" };
    }
  },
}));
