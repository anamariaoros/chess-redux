/* global document: document */
export const body = document.querySelector( "body" );

/* eslint complexity: "off", no-restricted-globals: "off" */
export function checkProperties( object ) {
    const requiredKeys = [
        "firstHandleValue",
        "secondHandleValue",
        "containerName",
        "sliderWidth",
        "minimumValue",
        "maximumValue",
    ];

    for ( let i = 0; i < requiredKeys.length; i += 1 ) {
        const prop = requiredKeys[ i ];
        if ( !Object.prototype.hasOwnProperty.call( object, prop ) ) {
            return false;
        }
    }

    const parentContainer = document.querySelector( object.containerName );
    if ( parentContainer === null || parentContainer === undefined ) {
        return false;
    }

    /* eslint no-restricted-syntax: "off" */
    for ( const prop in object ) {
        if ( prop === "containerName" && typeof object[ prop ] !== "string" ) {
            return false;
        } if ( typeof ( object[ prop ] ) !== "number" && prop !== "containerName" ) {
            return false;
        }
    }
    return true;
}

export function getClosestSlider( position, firstSlider, secondSlider ) {
    const firstSliderOffset = parseInt( firstSlider.getBoundingClientRect().left, 10 );
    const secondSliderOffset = parseInt( secondSlider.getBoundingClientRect().left, 10 );
    const firstDistance = Math.abs( position - firstSliderOffset );
    const secondDistance = Math.abs( position - secondSliderOffset );
    const closestSlider = firstDistance < secondDistance ? firstSlider : secondSlider;
    return closestSlider;
}
