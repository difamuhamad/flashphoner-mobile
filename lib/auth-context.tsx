import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  session: Session | null;
}>({ session: null });

export const useAuth = () => useContext(AuthContext);
