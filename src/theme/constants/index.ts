import {Platform} from 'react-native'
import {DefaultTheme} from 'styled-components'
import {Colors as DarkColors} from './DarkTheme/colors'
import {Colors as LightColors} from './LightTheme/colors'
import {Media} from './SharedTheme/media'
import {Radius} from './SharedTheme/radius'
import {Shadows} from './SharedTheme/shadows'
import {Spacings} from './SharedTheme/spacings'
import {Text} from './SharedTheme/text'

export * from './Devices'
export * from './SharedTheme'

export const API_URL = `https://infinite-meadow-30935.herokuapp.com/`

export const isWeb = Platform.OS === 'web'
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android'
export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const SIDEBAR_WIDTH = 375

export const LightTheme: DefaultTheme = {
	color: LightColors,
	radius: Radius,
	shadow: Shadows,
	spacing: Spacings,
	text: Text,
	media: Media,
}

export const DarkTheme: DefaultTheme = {
	color: DarkColors,
	radius: Radius,
	shadow: Shadows,
	spacing: Spacings,
	text: Text,
	media: Media,
}
