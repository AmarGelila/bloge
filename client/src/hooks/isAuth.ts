import { useToken } from "../store";
import type { TokenStore } from "../types";

function useIsAuth() {
	const jwtToken = useToken((state: TokenStore) => state.token);
	return Boolean(jwtToken);
}

export default useIsAuth;
