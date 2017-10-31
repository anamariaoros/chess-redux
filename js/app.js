import "../css/styles.css";

import RangeSlider from "./range-slider";

// test the class
const firstObject = {
    containerName: ".custom-slider-container",
    sliderWidth: 500,
    minimumValue: 0,
    maximumValue: 500,
    firstHandleValue: 10,
    secondHandleValue: 350,
};
//
// const secondObject = {
//     containerName: ".second-custom-slider-container",
//     sliderWidth: 700,
//     minimumValue: 0,
//     maximumValue: 1000,
// };

const firstSlider = new RangeSlider( firstObject );
firstSlider.init();
// const secondSlider = new RangeSlider( secondObject );
// secondSlider.init();
