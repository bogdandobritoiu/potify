import React, {useEffect, useState} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

export function useDimensions() {
	const [dimensions, setDimensions] = useState(Dimensions.get('window'))
	const onChange = ({
		window,
		screen,
	}: {
		window: ScaledSize
		screen: ScaledSize
	}) => {
		setDimensions(window)
	}
	useEffect(() => {
		Dimensions.addEventListener('change', onChange)
		return () => Dimensions.removeEventListener('change', onChange)
	}, [])
	return dimensions
}
