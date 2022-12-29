export const getElementProperties = (slider) => {
  const sliderStyle = window.getComputedStyle(slider);
  const sliderWidth = sliderStyle.getPropertyValue("width");
  const sliderWidthNum = Number(
    sliderWidth.substring(0, sliderWidth.length - 2)
  );

  const card = slider.childNodes[0];
  const cardStyle = window.getComputedStyle(card);
  const cardMarginLeft = cardStyle.getPropertyValue("margin-left");
  const cardMarginLeftNum = Number(
    cardMarginLeft.substring(0, cardMarginLeft.length - 2)
  );

  return { cardMarginLeftNum, sliderWidthNum };
};
