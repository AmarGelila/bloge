import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserStore } from "../types";

const useUser = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user: User | null) => set({ user }),
			updateLikes: (postId: number) =>
				set(({ user }) => ({
					user: user
						? {
								...user,
								likedPosts: user.likedPosts?.some(
									(p) => p.id === postId,
								)
									? user.likedPosts.filter(
											(p) => p.id !== postId,
										)
									: [
											...(user.likedPosts ?? []),
											{ id: postId },
										],
							}
						: user,
				})),
		}),
		{
			name: "user",
		},
	),
);

export default useUser;
