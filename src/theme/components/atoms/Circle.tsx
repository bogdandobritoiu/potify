import {Text} from '@atoms/Text'
import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'

export interface ICircle {
	value?: string | number
	red?: boolean
	primary?: boolean
	big?: boolean
	small?: boolean
	tiny?: boolean
	noWidth?: boolean
}

export const Circle = ({
	value,
	red,
	primary,
	big,
	small,
	tiny,
	noWidth,
}: ICircle) => (
	<StyledCircle
		red={red}
		primary={primary}
		big={big}
		small={small}
		noWidth={noWidth}>
		<Text
			smaller={!small}
			semiBold={small}
			smallest={small && !tiny}
			tiny={tiny}
			lineHeight={tiny ? 14 : 16}
			white={!primary}
			black={primary}
			align="center"
			text={value}
			style={{letterSpacing: 0}}
		/>
	</StyledCircle>
)

const StyledCircle = styled(View)<{
	big?: boolean
	noWidth?: boolean
	red?: boolean
	primary?: boolean
	small?: boolean
	smallest?: boolean
}>`
	max-height: ${({noWidth, big, smallest, small}) => {
		if (noWidth) return 'auto'
		if (big) return 24
		if (small) return 18
		if (smallest) return 8
		return 16
	}};
	min-width: ${({noWidth, big, smallest, small}) => {
		if (noWidth) return 'auto'
		if (big) return 24
		if (small) return 18
		if (smallest) return 8
		return 16
	}};
	justify-content: center;
	align-items: center;
	border-radius: ${({big, small, smallest}) => {
		if (big) return 24
		if (small) return 18
		if (smallest) return 8
		return 16
	}};
	position: relative;
	background: ${({theme, red, primary}) => {
		if (red) return theme.Colors.red
		if (primary) return theme.Colors.primary
		return theme.Colors.gray
	}};
	padding-top: 3px;
	padding-left: 0.5px;
`
