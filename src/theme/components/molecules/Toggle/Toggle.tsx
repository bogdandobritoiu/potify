import {Text} from '@atoms/Text'
import React from 'react'
import {Pressable, View} from 'react-native'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated'
import styled, {useTheme} from 'styled-components/native'

const CIRCLE_SIZE = 20
const WRAPPER_SIZE = 40

type ToggleProps = {
	text?: string
	isActive: boolean
	onPress: (isActive?: boolean) => void
}

export const Toggle = ({text, isActive, onPress}: ToggleProps) => {
	const theme = useTheme()
	const circleAnimation = useAnimatedStyle(() => {
		return {
			height: CIRCLE_SIZE,
			width: CIRCLE_SIZE,
			transform: [
				{
					translateX: withTiming(
						isActive ? WRAPPER_SIZE - CIRCLE_SIZE : 0,
						{
							duration: 300,
						},
					),
				},
			],
		}
	}, [isActive])

	const progress = useDerivedValue(() => {
		return withTiming(isActive ? 1 : 0)
	})

	const backgroundAnimation = useAnimatedStyle(() => {
		return {
			height: CIRCLE_SIZE,
			width: WRAPPER_SIZE,
			borderRadius: CIRCLE_SIZE,
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				[theme.color.red, theme.color.green],
			),
		}
	}, [isActive])

	return (
		<StyledWrapper onPress={() => onPress(!isActive)}>
			<Text white>{text}</Text>
			<Animated.View style={backgroundAnimation}>
				<Animated.View style={circleAnimation}>
					<StyledCircle />
				</Animated.View>
			</Animated.View>
		</StyledWrapper>
	)
}

const StyledCircle = styled(View)`
	border-radius: ${CIRCLE_SIZE};
	flex: 1;
	background: white;
`
const StyledWrapper = styled(Pressable)`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
