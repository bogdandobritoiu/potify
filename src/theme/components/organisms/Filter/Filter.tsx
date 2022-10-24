import {Row} from '@atoms/Row'
import {Text} from '@atoms/Text'
import {Toggle} from '@molecules/Toggle'
import {FilterEnum, FilterType} from '@screens/Coins/context/useFilters'
import {rgba} from 'polished'
import React, {useEffect, useRef, useState} from 'react'
import {
	FlatList,
	ListRenderItem,
	NativeSyntheticEvent,
	Pressable,
	TextInput,
	TextInputFocusEventData,
	View,
} from 'react-native'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated'
import styled, {useTheme} from 'styled-components/native'

export type FilterOptions = FilterType & {
	isActive: boolean
	description?: string
	options: FilterOption[]
}

export type FilterOption = {
	value: number
	unit: string
}

interface FilterProps {
	data: FilterOptions
	current: number
	isDisabled: boolean
	isOpen?: boolean
	white?: boolean
	small?: boolean
	description?: string
	onChange: (filter: FilterType) => void
	onDelete?: (type: FilterEnum) => void
	onToggle?: () => void
}

export const Filter = ({
	data: {type, text, options},
	current,
	isOpen,
	isDisabled,
	white,
	description,
	small,
	onChange,
	onDelete,
	onToggle,
}: FilterProps) => {
	const theme = useTheme()

	const [showOptions, setShowOptions] = useState(isOpen)

	const inputRef = useRef<TextInput>(null)

	useEffect(() => {
		if (isOpen && !current) focusInput()
		setShowOptions(isOpen)
	}, [isOpen])

	const animation = useAnimatedStyle(() => {
		return {
			height: withTiming(showOptions ? 60 : 0),
			overflow: 'hidden',
		}
	}, [showOptions])

	const onChangeText = (value: string) => {
		onChange({type, text, value: value !== '' ? Number(value) : undefined})
	}

	const selectOption = (item: FilterOption) => {
		onChangeText(item.value.toString())
	}

	const deleteFilter = () => {
		onDelete(type)
	}

	const focusInput = () => {
		inputRef?.current?.focus()
	}

	const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (!event.nativeEvent.text.length && onToggle) onToggle()
	}

	const renderItem: ListRenderItem<FilterOption> = ({item}) => {
		const isActive = current === item.value

		return (
			<FilterItemOption
				isActive={isActive}
				onPress={() => selectOption(item)}
				{...item}
			/>
		)
	}

	const disabledAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isDisabled ? 0.5 : 1),
		}
	}, [isDisabled])

	return (
		<StyledFilter white={white}>
			<Row align="center" justify="space-between">
				<Animated.View
					style={disabledAnimation}
					pointerEvents={isDisabled ? 'none' : 'auto'}>
					<StyledFilterTitle>
						<StyledTitle onPress={focusInput}>
							<Text
								big={!small}
								smallest={small}
								bold
								black={white}>
								{text}
							</Text>
						</StyledTitle>
						<StyledFilterInput
							ref={inputRef}
							value={current?.toString()}
							placeholder={'-'}
							placeholderTextColor={rgba(
								theme.color.primary,
								0.5,
							)}
							onBlur={onBlur}
							maxLength={10}
							keyboardType="numeric"
							style={{
								fontSize: small ? 14 : 20,
							}}
							onChangeText={onChangeText}
						/>
					</StyledFilterTitle>
				</Animated.View>

				{onToggle && (
					<View
						style={{
							paddingRight: 10,
						}}>
						<Toggle isActive={isOpen || false} onPress={onToggle} />
					</View>
				)}

				{/* {onDelete && (
					<StyledDelete onPress={deleteFilter}>
						<Text black={white} big>
							x
						</Text>
					</StyledDelete>
				)} */}
			</Row>

			<Animated.View style={animation}>
				<StyledOptions>
					{description && (
						<View
							style={{
								paddingBottom: 10,
								paddingLeft: 10,
							}}>
							<Text smallest black={white}>
								{description}
							</Text>
						</View>
					)}
					<FlatList
						data={options}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={renderItem}
						keyboardShouldPersistTaps="always"
						contentContainerStyle={{
							paddingLeft: 5,
							paddingRight: 5,
						}}
					/>
				</StyledOptions>
			</Animated.View>
		</StyledFilter>
	)
}

const StyledTitle = styled(Pressable)`
	height: 100%;
	justify-content: center;
	padding: 0 10px;
`

const StyledDelete = styled(Pressable)`
	padding: 0 10px;
`

const StyledFilterTitle = styled(View)`
	flex-direction: row;
	align-items: center;
	height: 30px;
	padding-right: 10px;
`

const StyledOptions = styled(View)`
	position: absolute;
`

const StyledFilterInput = styled(TextInput)`
	color: ${({theme}) => theme.color.primary};
	text-align: center;
	font-weight: bold;
	height: 100%;
`

const FilterItemOption = ({
	isActive,
	value,
	unit,
	onPress,
}: FilterOption & {isActive: boolean; onPress: () => void}) => {
	const theme = useTheme()

	const progress = useDerivedValue(() => {
		return withTiming(isActive ? 1 : 0)
	})

	const animation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isActive ? 1 : 0.5),
			borderRadius: 15,
			marginRight: 4,
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				[theme.color.black, theme.color.primary],
			),
		}
	}, [isActive])

	return (
		<Pressable onPress={onPress}>
			<Animated.View style={animation}>
				<StyledFilterItemOption>
					<Text smaller>{`${value} ${unit}`}</Text>
				</StyledFilterItemOption>
			</Animated.View>
		</Pressable>
	)
}

const StyledFilterItemOption = styled(View)`
	flex-direction: row;
	padding: 4px 8px;
`

const StyledFilter = styled(View)`
	background: ${({white, theme}) =>
		white ? theme.color.white : 'transparent'};
	border-radius: 15px;
`
