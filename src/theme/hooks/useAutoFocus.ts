import {useEffect} from 'react'
import {InteractionManager} from 'react-native'

export function useAutoFocus(inputRef: any, timeout: number) {
	function onFocus() {
		if (inputRef && inputRef.current) inputRef.current.focus()
	}

	useEffect(() => {
		InteractionManager.runAfterInteractions(() => {
			if (timeout) {
				setTimeout(() => {
					onFocus()
				}, timeout)
			} else {
				onFocus()
			}
		})
	}, [])
}
