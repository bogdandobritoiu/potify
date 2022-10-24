export function useClipboard() {
	async function checkPermission() {
		try {
			// const permissionStatus = await window.navigator.permissions.query({
			// 	name: '',
			// })
			// // Will be 'granted', 'denied' or 'prompt':

			// if (permissionStatus.state === 'granted') {
			// 	return true
			// }

			// if (permissionStatus.state === 'denied') {
			// 	return false
			// }

			return false
		} catch (error) {
			// eslint-disable-next-line no-console
			console.warn(error)
			return false
		}

		// // Listen for changes to the permission state
		// permissionStatus.onchange = () => {
		// 	console.log(permissionStatus.state)
		// }
	}

	async function saveClipboard(value: string) {
		return window.navigator.clipboard.writeText(value)
	}

	async function getClipboard() {
		return window.navigator.clipboard.readText()
	}

	async function hasClipboardURL() {
		const url = await getClipboard()

		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i',
		) // fragment locator

		return !!pattern.test(url)
	}

	return {saveClipboard, getClipboard, hasClipboardURL, checkPermission}
}
