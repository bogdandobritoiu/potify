export interface ThemeInterface {
  text: {
    tiny: number;
    smallest: number;
    smaller: number;
    small: number;
    medium: number;
    big: number;
    bigger: number;
    biggest: number;
    huge: number;
    regular: string;
    semiBold: string;
    bold: string;
  };
  spacing: {
    tiny: number;
    smallest: number;
    smaller: number;
    small: number;
    medium: number;
    big: number;
    bigger: number;
    biggest: number;
    huge: number;
  };
  color: {
    primary: string;
    green: string;
    red: string;
    white: string;
    black: string;
  };
  shadow: {
    big: string;
    small: string;
  };
  radius: {
    tiny: number;
    smallest: number;
    smaller: number;
    small: number;
    medium: number;
    big: number;
    bigger: number;
    biggest: number;
    huge: number;
  };
  media: {
    isDesktopOrLaptop: boolean;
    isBigScreen: boolean;
    isMobile: boolean;
    isMobileTiny: boolean;
    isMobileSmallest: boolean;
    isTablet: boolean;
    isTabletOrMobile: boolean;
    isTabletOrMobileDevice: boolean;
    isPortrait: boolean;
    isRetina: boolean;
    isMobileWeb: boolean;
  };
}
