import {RefObject} from 'react'
import FlashMessage, {
	hideMessage,
	MessageOptions,
	showMessage,
} from 'react-native-flash-message'
import {useTheme} from 'styled-components/native'

type IToast = {
	title?: string
	description?: string
	image?: string
	type?: 'default' | 'info'
	position?: MessageOptions['position']
	buttonText?: string
	onPress?: () => void
	renderContent?: JSX.Element | JSX.Element[]
}

export function useToast(ref?: RefObject<FlashMessage>) {
	const theme = useTheme()

	function showToast({
		title,
		description,
		position,
		image,
		type = 'default',
		buttonText,
		onPress,
		renderContent,
	}: IToast) {
		if (ref && ref.current) {
			ref.current.showMessage({
				// @ts-ignore
				title,
				description,
				position,
				type,
				backgroundColor: theme.Colors.background,
				buttonText,
				image,
				message: '',
				renderContent,
				onPress,
			})
		} else {
			showMessage({
				// @ts-ignore
				title,
				message: '',
				type,
				description,
				position,
				backgroundColor: theme.Colors.background,
				buttonText,
				image,
				onPress,
				renderContent,
			})
		}
	}

	function hideToast() {
		if (ref && ref.current) {
			ref.current.hideMessage()
		} else {
			hideMessage()
		}
	}

	return {
		showToast,
		hideToast,
	}
}
