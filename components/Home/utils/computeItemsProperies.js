import { LARGE, SMALL } from "../constants";

const isSmall = (width) => width <= SMALL;
const isLarge = (width) => width > LARGE;
const isMedium = (width) => width > SMALL && width <= LARGE;

const computeWidthToDisplayItems = (slider) => {
  const sliderStyle = window.getComputedStyle(slider);
  const sliderWidthAsString = sliderStyle.getPropertyValue("width");
  const sliderWidth = Number(
    sliderWidthAsString.substring(0, sliderWidthAsString.length - 2)
  );

  const [card] = slider.childNodes;
  const cardStyle = window.getComputedStyle(card);
  const cardMarginLeftAsString = cardStyle.getPropertyValue("margin-left");
  const cardMarginLeft = Number(
    cardMarginLeftAsString.substring(0, cardMarginLeftAsString.length - 2)
  );

  return -100 * (1 - cardMarginLeft / sliderWidth);
};

export const computeItemsProperies = (slider, windowsWidth) => {
  const widthToDisplayItems = computeWidthToDisplayItems(slider);

  if (isLarge(windowsWidth)) {
    return { itemWidth: -33.3333, items: 3 };
  }

  if (isMedium(windowsWidth)) {
    const itemWidth = widthToDisplayItems / 2;

    return {
      itemWidth,
      items: 2,
    };
  }

  if (isSmall(windowsWidth)) {
    const itemWidth = widthToDisplayItems;

    return { itemWidth, items: 1 };
  }
};
