/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'

interface ISpacer {
	height?: number
	hasLine?: boolean
	tiny?: boolean
	smallest?: boolean
	smaller?: boolean
	small?: boolean
	medium?: boolean
	big?: boolean
	bigger?: boolean
	biggest?: boolean
	huge?: boolean
	padding?: number
	horizontal?: boolean
}

export const Spacer = (props: ISpacer) => (
	<StyledSpacer {...props}>
		{props.hasLine && <StyledSpacerLine />}
	</StyledSpacer>
)

const StyledSpacer = styled(View)<ISpacer>`
	height: ${({
		theme,
		hasLine,
		tiny,
		small,
		smaller,
		smallest,
		medium,
		big,
		bigger,
		biggest,
		huge,
		height,
	}) => {
		if (height) return height
		if (tiny) return theme.spacing.tiny
		if (smallest) return theme.spacing.smallest
		if (smaller) return theme.spacing.smaller
		if (small) return theme.spacing.small
		if (medium) return theme.spacing.medium
		if (big) return theme.spacing.big
		if (bigger) return theme.spacing.bigger
		if (biggest) return theme.spacing.biggest
		if (huge) return theme.spacing.huge
		if (hasLine) return 1
		return 0
	}}px;
	width: ${({
		theme,
		horizontal,
		tiny,
		small,
		smaller,
		smallest,
		medium,
		big,
		bigger,
		biggest,
		huge,
		height,
	}) => {
		if (horizontal) {
			return `${() => {
				if (height) return height
				if (tiny) return theme.spacing.tiny
				if (smallest) return theme.spacing.smallest
				if (smaller) return theme.spacing.smaller
				if (small) return theme.spacing.small
				if (medium) return theme.spacing.medium
				if (big) return theme.spacing.big
				if (bigger) return theme.spacing.bigger
				if (biggest) return theme.spacing.biggest
				if (huge) return theme.spacing.huge
				return 0
			}}px`
		}
		return '100%'
	}};
`

const StyledSpacerLine = styled(View)`
	height: 1px;
	background: ${({theme}) => theme.Colors.gray};
`
