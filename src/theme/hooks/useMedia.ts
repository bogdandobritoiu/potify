import {isWeb} from '@constants'
import 'react-native-match-media-polyfill'
import {useMediaQuery} from 'react-responsive'

export const useMedia = () => {
	const isDesktopOrLaptop = useMediaQuery({
		maxWidth: 1224,
	})
	const isBigScreen = useMediaQuery({
		minWidth: 1400,
	})
	const isMobile = useMediaQuery({
		maxWidth: 767,
	})
	const isMobileWeb = isWeb && isMobile
	const isMobileTiny = useMediaQuery({
		maxWidth: 320,
	})
	const isMobileSmallest = useMediaQuery({
		maxWidth: 348,
	})
	const isTablet = useMediaQuery({
		minWidth: 768,
		maxWidth: 991,
	})
	const isTabletOrMobile = useMediaQuery({
		maxDeviceWidth: 1824,
	})
	const isTabletOrMobileDevice = useMediaQuery({maxWidth: 1224})
	const isPortrait = useMediaQuery({query: '(orientation: portrait)'})
	const isRetina = useMediaQuery({query: '(min-resolution: 2dppx)'})

	return {
		isDesktopOrLaptop,
		isBigScreen,
		isMobile,
		isMobileTiny,
		isMobileSmallest,
		isTablet,
		isTabletOrMobile,
		isTabletOrMobileDevice,
		isPortrait,
		isRetina,
		isMobileWeb,
	}
}
