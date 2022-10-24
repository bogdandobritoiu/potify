import {useEffect, useRef} from 'react'
import {AppState, AppStateStatus} from 'react-native'

export function useAppState(onActive: () => void) {
	let appState = useRef<AppStateStatus>(AppState.currentState).current

	const handleAppStateChange = (nextAppState: AppStateStatus) => {
		// eslint-disable-next-line no-console
		console.log(`App State: ${nextAppState}`)
		if (appState !== nextAppState) {
			if (
				appState?.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				onActive()
			}
			if (appState) appState = nextAppState
		}
	}

	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange)

		return () => {
			AppState.removeEventListener('change', handleAppStateChange)
		}
	}, [])

	return {
		appState,
	}
}
