/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserType = "admin" | "customer" | null;

interface TokenState {
  token: string | null;
  userType: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;
  datas: any;
  setToken: (token: string, userType: UserType, name: any, datas: any) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      userType: null,
      name: null,
      datas: [],
      setToken: (token: string, userType: UserType, name: any, datas: any) =>
        set({ token, userType, name, datas }),
      clearToken: () => set({ token: null, userType: null, name: null, datas: [] }),
      setUserType: (userType: UserType) => set({ userType }),
      setNames: (name: any) => set({ name }),
    }),
    {
      name: "token-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage with JSON parsing
    }
  )
);

export default useTokenStore;
