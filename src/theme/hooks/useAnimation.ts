import { isMobile } from '@constants'
import {Animated, Easing, EasingFunction} from 'react-native'
import {useAnimatedValue} from './useAnimatedValue'

export function useAnimation(
	duration = 500,
	initial?: number,
	easing?: EasingFunction,
) {
	const opacityAnimation = useAnimatedValue(initial ?? 1)
	const scaleAnimation = useAnimatedValue(initial ?? 1)
	const translateXAnimation = useAnimatedValue(initial ?? 0)
	const translateYAnimation = useAnimatedValue(initial ?? 0)

	function toggleOpacity(bool: boolean) {
		Animated.timing(opacityAnimation, {
			toValue: bool ? 1 : 0,
			duration,
			easing: easing || Easing.linear,
			useNativeDriver: isMobile,
		}).start()
	}

	function toggleTranslateX(toValue: number) {
		Animated.timing(translateXAnimation, {
			toValue,
			duration,
			easing: easing || Easing.linear,
			useNativeDriver: isMobile,
		}).start()
	}
	function toggleTranslateY(toValue: number) {
		Animated.timing(translateYAnimation, {
			toValue,
			duration,
			easing: easing || Easing.linear,
			useNativeDriver: isMobile,
		}).start()
	}

	function toggleScale(toValue: number) {
		Animated.timing(scaleAnimation, {
			toValue,
			duration,
			easing: easing || Easing.elastic(1.1),
			useNativeDriver: isMobile,
		}).start()
	}

	function resetOpacity(toValue?: number) {
		opacityAnimation.setValue(toValue ?? initial ?? 1)
	}
	function resetTranslateX(toValue?: number) {
		translateXAnimation.setValue(toValue ?? initial ?? 0)
	}
	function resetTranslateY(toValue?: number) {
		translateYAnimation.setValue(toValue ?? initial ?? 0)
	}
	function resetScale(toValue?: number) {
		scaleAnimation.setValue(toValue ?? initial ?? 1)
	}

	return {
		opacityAnimation,
		toggleOpacity,
		resetOpacity,

		scaleAnimation,
		toggleScale,
		resetTranslateX,

		translateXAnimation,
		toggleTranslateX,
		resetTranslateY,

		translateYAnimation,
		toggleTranslateY,
		resetScale,
	}
}
