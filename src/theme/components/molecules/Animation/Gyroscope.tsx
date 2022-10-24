import {Gyroscope} from 'expo-sensors'
import React, {FC, useEffect, useState} from 'react'
import Animated, {
	Easing,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

export const AnimatedGyroscope: FC = ({children, style}) => {
	const [subscription, setSubscription] = useState(null)

	useEffect(() => {
		Gyroscope.isAvailableAsync().then((isAvailable) => {
			if (isAvailable) {
				Gyroscope.setUpdateInterval(100)
				setSubscription(
					Gyroscope.addListener((gyroscopeData) => {
						// console.warn(gyroscopeData)
						gyro.value = gyroscopeData
					}),
				)
				return () => {
					subscription && subscription.remove()
					setSubscription(null)
				}
			}
		})
	}, [])

	let gyro = useSharedValue({x: 0, y: 0, z: 0})
	let prev = useSharedValue({x: 0, y: 0, z: 0})

	const derivedTranslations = useDerivedValue(() => {
		const MAX_X = 10
		const MAX_Y = 10
		let newX = prev.value.x - gyro.value.x * -1
		let newY = prev.value.y - gyro.value.y * -1
		let newZ = prev.value.z - gyro.value.z * -1

		if (Math.abs(newX) >= MAX_X) {
			newX = prev.value.x
		}
		if (Math.abs(newY) >= MAX_Y) {
			newY = prev.value.y
		}

		prev.value = {
			x: newX,
			y: newY,
			z: newZ,
		}

		return {
			x: newX,
			y: newY,
			z: newZ,
		}
	})

	const animation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(derivedTranslations.value.x, {
						mass: 0.5,
					}),
				},
				{
					translateY: withSpring(derivedTranslations.value.y, {
						mass: 0.5,
					}),
				},
				{
					skewX: withSpring(derivedTranslations.value.x / 100),
				},
				{
					skewY: withSpring(derivedTranslations.value.y / 100),
				},
			],
		}
	})

	return <Animated.View style={[animation, style]}>{children}</Animated.View>
}
