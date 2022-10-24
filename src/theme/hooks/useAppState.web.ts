import {useEffect, useRef} from 'react'
import {AppStateStatus} from 'react-native'

export function useAppState(onActive: () => void, onInactive?: () => void) {
	let appState = useRef<AppStateStatus>('active').current

	const onFocus = () => {
		appState = 'active'
		onActive()
	}

	const onBlur = () => {
		appState = 'inactive'
		if (onInactive) onInactive()
	}

	useEffect(() => {
		window.addEventListener('focus', onFocus)
		window.addEventListener('blur', onBlur)
		return () => {
			window.removeEventListener('focus', onFocus)
			window.removeEventListener('blur', onBlur)
		}
	})

	return {
		appState,
	}
}
