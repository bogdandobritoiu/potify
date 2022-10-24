import React, {useEffect, useImperativeHandle} from 'react'
import {Text} from '@atoms/Text'
import {forwardRef, useMemo, useState} from 'react'
import {FlatList, ListRenderItem, Pressable, View} from 'react-native'
import styled, {useTheme} from 'styled-components/native'
import {rgba} from 'polished'
import {ITab} from '@molecules/Tabs'
import Animated, {
	Easing,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated'
import DraggableFlatList, {
	RenderItem,
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist'

export interface IPagerNavigationRef {
	setPage: (index: number) => void
	setPageWithoutAnimation: (index: number) => void
}

export interface IPagerNavigationProps {
	tabs: ITab[]
	draggable?: boolean
	onChange?: (index: number) => void
}

export const PagerNavigation = forwardRef(
	({tabs, draggable, onChange}: IPagerNavigationProps, ref) => {
		const [currentIndex, setCurrentIndex] = useState(0)
		const [data, setData] = useState(tabs)

		useEffect(() => {
			setData(tabs)
		}, [tabs])

		useImperativeHandle(ref, () => ({
			setPage: setCurrentIndex,
		}))

		const renderTab = useMemo(
			() =>
				({item, index}) =>
					(
						<PagerNavigationTab
							text={item.text}
							isActive={index === currentIndex}
							onPress={() => {
								setCurrentIndex(index)
								onChange && onChange(index)
							}}
						/>
					),
			[currentIndex],
		)

		const renderDraggableTab = ({
			item,
			isActive,
			drag,
			index,
		}): RenderItemParams<ITab> => (
			<ScaleDecorator>
				<PagerNavigationTab
					text={item.text}
					isActive={index === currentIndex}
					disabled={isActive}
					onLongPress={drag}
					onPress={() => {
						setCurrentIndex(index)
						onChange && onChange(index)
					}}
				/>
			</ScaleDecorator>
		)

		if (draggable) {
			return (
				<DraggableFlatList
					onDragEnd={({data}) => setData(data)}
					data={data}
					horizontal
					keyExtractor={(item) => item.key}
					renderItem={renderDraggableTab}
				/>
			)
		}

		return <FlatList data={tabs} horizontal renderItem={renderTab} />
	},
)

export interface PagerNavigationTabProps {
	text: string
	onPress: () => void
	onLongPress: () => void
	isActive: boolean
}

export const PagerNavigationTab = ({
	text,
	onPress,
	onLongPress,
	isActive,
}: PagerNavigationTabProps) => {
	const theme = useTheme()

	const opacityStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isActive ? 1 : 0.4, {
				duration: 150,
				easing: Easing.bezier(0.5, 0.01, 0, 1),
			}),
		}
	}, [isActive])

	return (
		<Animated.View style={opacityStyle}>
			<StyledTab onPress={onPress} onLongPress={onLongPress}>
				<Text bold color={rgba(theme.color.white, isActive ? 1 : 0.5)}>
					{text}
				</Text>
			</StyledTab>
		</Animated.View>
	)
}

const StyledTab = styled(Pressable)`
	padding: 10px;
`
