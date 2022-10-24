import Clipboard from '@react-native-community/clipboard'

export function useCopyToClipboard() {
	function onCopyToClipboard(value: string) {
		Clipboard.setString(value)
	}

	return {onCopyToClipboard}
}
