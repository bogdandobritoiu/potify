import Clipboard from '@react-native-community/clipboard'

export function useClipboard() {
	async function saveClipboard(value: string) {
		await Clipboard.setString(value)
	}

	async function getClipboard() {
		return Clipboard.getString()
	}

	async function hasClipboardURL() {
		return Clipboard.hasURL()
	}

	async function checkPermission() {
		return true
	}

	return {saveClipboard, getClipboard, hasClipboardURL, checkPermission}
}
