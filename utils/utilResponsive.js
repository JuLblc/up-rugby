// https://medium.com/applike/https-medium-com-applike-react-responsive-conditional-rendering-of-component-c97ab247097d

export const getDeviceTypeInfo = (width, height) => {
//   const deviceWidthObject = {
//     mobileSmall: { max: 375, min: 0 },
//     mobileLarge: { max: 767, min: 376 },
//     tablet: { max: 991, min: 768 },
//     laptop: { max: 1440, min: 992 },
//     largerThanLaptop: { max: 999999, min: 1441 }
//   }

  const idDeviceBreakpointsByWidth = {
    laptopMax: 1440,
    laptopMin: 992,
    tabletMin: 768,
    tabletMax: 991,
    mobileMax: 767,
    defaultMlin: 768 // Unrecognized device
  }

//   const idMobileHeight = {
//     mobileLandscape_min : 320,
//     mobileLandscape_max : 425
//   }

  let deviceTypeInfo = {
    isMobile: false,
    isTablet: false,
    isDesktopOrLaptop: false,
    isBigScreen: false
  }

  if (width < idDeviceBreakpointsByWidth.mobileMax) {
    deviceTypeInfo.isMobile = true
  } 
  
  if (width >= idDeviceBreakpointsByWidth.mobileMax && width < idDeviceBreakpointsByWidth.tabletMax) {
    deviceTypeInfo.isTablet = true
  } 
  
  if (width >= idDeviceBreakpointsByWidth.tabletMax && width < idDeviceBreakpointsByWidth.laptopMax) {
    deviceTypeInfo.isDesktopOrLaptop = true
  } 
  
  if (width >= idDeviceBreakpointsByWidth.laptopMax) {
    deviceTypeInfo.isBigScreen = true
  }
  
  return deviceTypeInfo
}
