import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
import type { TokenStore } from "../types";

export const tokenStore = create<TokenStore>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token: token }),
		}),
		{ name: "jwt-token" },
	),
);

export const useToken = <T = TokenStore>(
	selector: (state: TokenStore) => T = (state) => state as unknown as T,
): T => useStore(tokenStore, selector);

export default useToken;
