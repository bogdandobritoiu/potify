export function useCopyToClipboard() {
	function onCopyToClipboard(value: string) {
		window.navigator.clipboard.writeText(value)
	}

	return {onCopyToClipboard}
}
