import React, {forwardRef} from 'react'
import {View} from 'react-native'
import PagerView, {
	ViewPagerOnPageSelectedEvent,
	ViewPagerProps,
} from 'react-native-pager-view'
import styled from 'styled-components/native'

interface IPager extends ViewPagerProps {
	onChange: (event: ViewPagerOnPageSelectedEvent) => void
}

export interface IPagerRef {
	setPage: (index: number) => void
	setPageWithoutAnimation: (index: number) => void
}

export const Pager = forwardRef<IPagerRef, IPager>(
	({children, onChange}, ref) => (
		<PagerView
			style={{
				flex: 1,
			}}
			initialPage={0}
			scrollEnabled
			onPageSelected={onChange}
			// @ts-ignore
			ref={ref}>
			{React.Children.map(children, (child, index) => (
				<StyledPage>{child}</StyledPage>
			))}
		</PagerView>
	),
)

const StyledPage = styled(View)``
