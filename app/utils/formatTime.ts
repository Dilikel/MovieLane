export function formatTime(seconds: number): string {
	const hrs = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = Math.floor(seconds % 60)
	return `${hrs > 0 ? `${hrs}:` : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
}
