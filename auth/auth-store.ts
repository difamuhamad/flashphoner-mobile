import { supabase } from "@/lib/supabase";
import { create } from "zustand";

type AuthStore = {
  user: any;
  profile: any;
  token?: string;
  email: string | null;
  password: string | null;
  isLoading: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string | null,
    password: string | null
  ) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

type SupabaseSingIn = {
  email: string;
  password: string;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  token: undefined,
  isLoading: false,
  email: null,
  password: null,

  //   Register function (supabase)
  register: async (username, email, password) => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error || !data.user)
        throw new Error(
          error?.message || "Signup failed, please try again later"
        );

      // Insert to db users with the same id
      const { error: insertError } = await supabase
        .from("mobile_profiles")
        .insert({
          id: data.user.id,
          username,
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
      } else {
        set({ user: null, token: undefined, profile: undefined });
      }
    } catch (err) {
      console.error("Failed to refresh user", err);
      set({ user: null, token: undefined, profile: undefined });
    }
  },

  //   Logout function
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, token: undefined });
  },
}));
