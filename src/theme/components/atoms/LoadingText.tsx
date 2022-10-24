import {rgba} from 'polished'
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Text} from './Text'

const TEXTS = [
	'To the moon 🌕',
	'Feeding the cats 🐈‍⬛ 🐈',
	'Breaking the banks 🏦',
	'Deleting all your hidden porn 🌽',
	'HODL on! 🚪',
]

export const LoadingTexts = () => {
	const theme = useTheme()
	const initialIndex = Math.floor(Math.random() * TEXTS.length)
	const [texts, setTexts] = useState(TEXTS)
	const [currentIndex, setCurrentIndex] = useState(initialIndex)

	const [maxWidth, setMaxWidth] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			if (texts.length <= 1) {
				setCurrentIndex(0)
				setTexts(TEXTS)
			} else {
				const randomIndex = Math.floor(Math.random() * texts.length)
				setCurrentIndex(randomIndex)
				setTexts(texts.filter((item) => item !== texts[randomIndex]))
			}

			// console.warn(texts.current, texts.current[randomIndex])
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	const onLayout = (event) => {
		const {width} = event.nativeEvent.layout
		setMaxWidth(width)
	}

	return (
		<View style={{marginTop: 4}}>
			{/* <Text bold>{text}</Text> */}
			<Text
				big
				bolder
				color={rgba(theme.color.primary, 0.2)}
				onLayout={onLayout}>
				{TEXTS[currentIndex]}
			</Text>
			<View
				style={{
					position: 'absolute',
					width: maxWidth,
					overflow: 'hidden',
					top: 0,
					bottom: 0,
				}}>
				{TEXTS.map((text, index) =>
					index === currentIndex ? (
						<LoadingText
							maxWidth={maxWidth}
							text={TEXTS[currentIndex]}
						/>
					) : null,
				)}
			</View>
		</View>
	)
}

const LoadingText = ({text, maxWidth}) => {
	const theme = useTheme()
	const loadingWidth = useSharedValue(0)

	useEffect(() => {
		loadingWidth.value = maxWidth
	}, [text, maxWidth])

	const loadingAnimation = useAnimatedStyle(() => {
		const width = withTiming(loadingWidth.value, {
			duration: 4500,
			easing: Easing.bezier(0.5, 0.01, 0, 1),
		})
		return {
			position: 'absolute',
			top: 0,
			bottom: 0,
			width,
		}
	}, [text])

	return (
		<Animated.View style={loadingAnimation}>
			<Text big bolder color={rgba(theme.color.primary, 1)}>
				{text}
			</Text>
		</Animated.View>
	)
}
