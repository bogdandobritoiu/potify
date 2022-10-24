import {isMobile} from '@constants'
import {useState, useEffect} from 'react'
import {Keyboard, KeyboardEventListener} from 'react-native'

export const useKeyboard = () => {
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
	const [keyboardHeight, setKeyboardHeight] = useState(0)
	const [remainingHeight, setRemainingHeight] = useState(0)

	const keyboardDidShow: KeyboardEventListener = (e) => {
		setKeyboardHeight(e.endCoordinates.height)
		setRemainingHeight(e.endCoordinates.screenY)
		setIsKeyboardOpen(true)
	}

	const keyboardDidHide = () => {
		setIsKeyboardOpen(false)
	}

	useEffect(() => {
		if (isMobile) {
			const keyboardDidShowListener = Keyboard.addListener(
				'keyboardDidShow',
				keyboardDidShow,
			)
			const keyboardDidHideListener = Keyboard.addListener(
				'keyboardDidHide',
				keyboardDidHide,
			)
			return () => {
				keyboardDidShowListener.remove()
				keyboardDidHideListener.remove()
			}
		}
		return () => null
	})

	return {
		isKeyboardOpen,
		keyboardHeight,
		remainingHeight,
	}
}
