export function formatTimeAgo(time: Date | string): string {
	const date = time instanceof Date ? time : new Date(time);
	const diffMs = Date.now() - date.getTime();

	if (diffMs < 0) return "Just now";

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMinutes < 1) return "Just now";
	if (diffHours < 1)
		return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
	if (diffDays < 1)
		return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
	return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}
