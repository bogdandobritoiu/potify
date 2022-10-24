import Share, {ShareOptions} from 'react-native-share'

export function useShare() {
	async function share(
		title: string,
		message: string,
		url?: string,
		subject?: string,
	) {
		const options: ShareOptions = {
			message: url?.length ? `${message}\n${url}` : message,
			subject: subject ?? title,
			title,
			url,
		}

		try {
			const success = await Share.open(options)
			return success
		} catch (error) {
			// eslint-disable-next-line no-console
			console.warn('share error', error)
			return error
		}
	}

	return {
		share,
	}
}
