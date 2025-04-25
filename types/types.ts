export type AuthStore = {
  user: any;
  profile: any;
  token?: string;
  email: string | null;
  password: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string | null,
    password: string | null
  ) => Promise<{ success: boolean; error?: string }>;
  findUser: (
    phone_number: string
  ) => Promise<{ success: boolean; message: string; data: any }>;
  refreshUser: () => Promise<{ success: boolean; message: string }>;
  editProfile: (profile: Profile, original: Profile) => Promise<Result>;
  addNewContact: (
    full_name: string,
    phone_number: string,
    userId: any
  ) => Promise<{ success: boolean; message: any }>;
  logout: () => Promise<void>;
};

export type Profile = {
  id: string;
  createdAt: string;
  email: string;
  phone_number: string;
  username: string;
  full_name: string;
};

export type Result = {
  success: boolean;
  message: string;
};

export type Contact = {
  full_name: string;
  phone_number: string;
  profileImage: string | null;
};
