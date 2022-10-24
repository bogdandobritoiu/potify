import {Text} from '@atoms/Text'
import {IPagerRef, Pager} from '@molecules/Pager'
import {rgba} from 'polished'
import React, {
	forwardRef,
	PropsWithChildren,
	ReactNode,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import {Pressable, View, ViewProps} from 'react-native'
import styled, {useTheme} from 'styled-components/native'

export interface ITab {
	key: string
	text?: string
	icon?: string
	count?: number
	custom?: boolean
	onPress?: () => void
}

export interface ITabs extends ViewProps {
	tabs: ITab[]
	initialIndex?: number
	small?: boolean
	big?: boolean
	fullWidth?: boolean
	tabHeight?: number
	onChangeIndex?: (index: number, key: string) => void
}

export const Tabs = forwardRef(
	(
		{
			initialIndex,
			tabs,
			small,
			fullWidth,
			children,
			big,
			onChangeIndex,
			style,
			tabHeight,
		}: PropsWithChildren<ITabs>,
		ref,
	) => {
		const theme = useTheme()
		const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0)

		const pagerRef = useRef<IPagerRef>(null)

		const handleIndexChange = (tabIndex: number, key: string): void => {
			if (onChangeIndex) onChangeIndex(tabIndex, key)
			pagerRef?.current?.setPage(tabIndex)
			setCurrentIndex(tabIndex)
		}

		useEffect(() => {
			if (initialIndex !== undefined) {
				setCurrentIndex(initialIndex)
			}
		}, [initialIndex])

		const renderTab = useCallback(
			(child: ReactNode, index: number) => (
				<StyledTabContent key={`tab-content-${index}`}>
					{child}
				</StyledTabContent>
			),
			[currentIndex],
		)

		if (children) {
			return (
				<StyledWrapper>
					{tabs.length > 1 && (
						<StyledTabs
							small={small}
							style={style}
							fullWidth={fullWidth}>
							{tabs?.map(
								(
									{
										icon,
										text,
										key,
										count,
										onPress,
										custom,
									}: ITab,
									index: number,
								) => {
									const color =
										index === currentIndex
											? theme.color.white
											: rgba(theme.color.white, 0.5)

									return (
										<Pressable
											key={`${key}-${text}`}
											onPress={() => {
												if (onPress) onPress()
												handleIndexChange(index, key)
											}}
											style={{
												height: '100%',
												flex: fullWidth ? 1 : undefined,
											}}>
											<StyledSegment
												isActive={
													index === currentIndex
												}
												key={text}
												fullWidth={fullWidth}
												small={small}>
												{/* {!!icon && (
												<Icon
													name={icon}
													custom={custom}
													color={color}
													size={big ? 24 : 20}
												/>
											)} */}
												<Text
													semiBold
													tiny={small}
													color={color}
													selectable={false}>
													{text}
												</Text>
											</StyledSegment>
										</Pressable>
									)
								},
							)}
						</StyledTabs>
					)}

					{!!children && (
						<Pager ref={pagerRef}>
							{React.Children.map(children, renderTab)}
						</Pager>
					)}
				</StyledWrapper>
			)
		}

		return (
			<StyledTabs small={small} big={big} fullWidth={fullWidth}>
				{tabs?.map(
					(
						{icon, text, key, count, onPress, custom}: ITab,
						index: number,
					) => {
						const color =
							index === currentIndex
								? theme.color.white
								: rgba(theme.color.white, 0.5)

						return (
							<Pressable
								onPress={() => {
									if (onPress) onPress()
									handleIndexChange(index, key)
								}}
								style={{
									height: '100%',
									flex: fullWidth ? 1 : undefined,
								}}>
								<StyledSegment
									isActive={index === currentIndex}
									key={text}
									fullWidth={fullWidth}
									small={small}
									big={big}>
									{/* {!!icon && (
									<Icon
										name={icon}
										custom={custom}
										color={color}
										size={big ? 24 : 20}
									/>
								)} */}
									<Text
										semiBold
										tiny={small}
										color={color}
										selectable={false}>
										{text}
									</Text>
								</StyledSegment>
							</Pressable>
						)
					},
				)}
			</StyledTabs>
		)
	},
)

const StyledChildren = styled(View)``

const StyledTabContent = styled(View)<{isActive?: boolean}>`
	flex: 1;
	/* max-height: ${({isActive}) => (isActive ? 'auto' : 0)}; */
`

const StyledWrapper = styled(View)`
	flex: 1;
`

const StyledTabs = styled(View)<{
	fullWidth?: boolean
	small?: boolean
	big?: boolean
}>`
	flex-direction: row;
	align-items: center;
	width: ${({fullWidth}) => (fullWidth ? '100%' : 'auto')};
	height: ${({small, big}) => {
		if (small) return 25
		if (big) return 36
		return 30
	}}px;
`

const StyledCircle = styled(View)`
	padding-left: ${({theme}) => theme.spacing.tiny / 2}px;
`

const StyledSegment = styled(View)<{
	fullWidth?: boolean
	isActive?: boolean
	small?: boolean
	big?: boolean
}>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 0
		${({theme, small, fullWidth, big}) => {
			if (fullWidth) return 0
			if (small) return theme.spacing.medium
			if (big) return theme.spacing.biggest
			return theme.spacing.bigger
		}}px;
	/* border-radius: ${({theme}) => theme.radius.md}px; */
	background: ${({theme, isActive}) => {
		// if (isActive) return theme.color.gray
		return rgba(theme.color.gray, 0)
	}};
`
