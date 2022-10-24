import {useMemo} from 'react'
import {Animated} from 'react-native'

const {Value} = Animated

export function useAnimatedValue(value: any, dependencies?: any[]) {
	return useMemo(() => {
		return new Value(value)
	}, dependencies || [])
}
