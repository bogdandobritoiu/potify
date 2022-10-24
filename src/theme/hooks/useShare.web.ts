import {useToast} from './useToast'

export function useShare() {
	const {showToast} = useToast()
	async function share(_title: string, message: string, url: string) {
		const text = url && message ? `${message}\n${url}` : message || url
		window.navigator.clipboard.writeText(text.trim())
		showToast({
			description: 'copied to clipboard ✅',
		})
	}

	return {
		share,
	}
}
