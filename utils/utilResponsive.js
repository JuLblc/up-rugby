// https://medium.com/applike/https-medium-com-applike-react-responsive-conditional-rendering-of-component-c97ab247097d

export const getDeviceTypeInfo = (width) => {
  const idDeviceBreakpointsByWidth = {
    defaultMlin: 768,
    laptopMax: 1440,
    laptopMin: 992,
    mobileMax: 767,
    tabletMax: 991,
  };

  const deviceTypeInfo = {
    isBigScreen: false,
    isDesktopOrLaptop: false,
    isMobile: false,
    isTablet: false,
  };

  if (width < idDeviceBreakpointsByWidth.mobileMax) {
    deviceTypeInfo.isMobile = true;
  }

  if (
    width >= idDeviceBreakpointsByWidth.mobileMax &&
    width < idDeviceBreakpointsByWidth.tabletMax
  ) {
    deviceTypeInfo.isTablet = true;
  }

  if (
    width >= idDeviceBreakpointsByWidth.tabletMax &&
    width < idDeviceBreakpointsByWidth.laptopMax
  ) {
    deviceTypeInfo.isDesktopOrLaptop = true;
  }

  if (width >= idDeviceBreakpointsByWidth.laptopMax) {
    deviceTypeInfo.isBigScreen = true;
  }

  return deviceTypeInfo;
};
