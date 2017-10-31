/* global document: document */
import { createMarkup } from "./sample-markup";
import { body, getClosestSlider, checkProperties } from "./utils";

export default class RangeSlider {
    constructor( sliderObject ) {
        const defaultOptions = {
            firstHandleValue: sliderObject.minimumValue,
            secondHandleValue: sliderObject.maximumValue,
        };
        this.options = Object.assign( {}, defaultOptions, sliderObject );

        this.setInitialCoordinates = this.setInitialCoordinates.bind( this );
        this.moveSlider = this.moveSlider.bind( this );
        this.changePosition = this.changePosition.bind( this );
    }

    init() {
        if ( !checkProperties( this.options ) ) {
            console.log( "Invalid parameters." );
            return;
        }

        const {
            containerName,
            sliderWidth,
            minimumValue,
            maximumValue,
            firstHandleValue,
            secondHandleValue,
        } = this.options;

        const parentContainer = document.querySelector( containerName );
        const markup = createMarkup( minimumValue, maximumValue, firstHandleValue, secondHandleValue );
        parentContainer.innerHTML = markup; // render the elements on page

        const sliderMainContainer = parentContainer.querySelector( ".slider-container" );
        sliderMainContainer.style.width = `${ sliderWidth }px`;
        const rangeContainer = parentContainer.querySelector( ".range-container" );
        const firstSlider = parentContainer.querySelector( ".draggable" );
        const secondSlider = parentContainer.querySelector( ".draggable.second" );
        const progressBar = parentContainer.querySelector( ".progress-bar" );

        const parentProperties = rangeContainer.getBoundingClientRect();
        const parentWidth = parseInt( parentProperties.width, 10 );

        const leftLimit = parentProperties.left;
        const rightLimit = parentWidth + leftLimit;

        const canMove = false;

        this.options = Object.assign( this.options, {
            rangeContainer,
            firstSlider,
            secondSlider,
            progressBar,
            leftLimit,
            rightLimit,
            canMove,
            parentProperties,
            parentWidth,
        } );

        this.computeLeftOffset();
        this.renderProgressBar();
        this.addEvents();
    }

    computeLeftOffset() {
        const {
            maximumValue,
            firstHandleValue,
            secondHandleValue,
            firstSlider,
            secondSlider,
            parentWidth,
        } = this.options;
        const unitPerPixel = maximumValue / parseInt( parentWidth, 10 );

        firstSlider.style.left = `${ firstHandleValue / unitPerPixel }px`;
        secondSlider.style.left = `${ secondHandleValue / unitPerPixel }px`;
    }

    setInitialCoordinates( evt ) {
        let {
            firstSlider, secondSlider, parentProperties, parentWidth, canMove,
        } = this.options; /* eslint prefer-const: "off" */
        const positionX = evt.clientX;
        const closest = getClosestSlider( positionX, firstSlider, secondSlider );
        const parentLeftOffset = parentProperties.left;
        const offset = Math.min( Math.max( positionX - parentLeftOffset, 0 ), parentWidth );

        closest.style.left = `${ offset }px`;

        this.renderProgressBar();
        canMove = true;
        this.options = Object.assign( this.options, { canMove, closest } );
        this.changeCurrentValue( offset );
    }

    moveSlider( evt ) {
        const {
            closest, leftLimit, rightLimit, canMove, parentProperties,
        } = this.options;

        if ( !canMove ) {
            return;
        }

        const positionX = evt.clientX;
        const position = Math.min( Math.max( positionX, leftLimit ), rightLimit );
        const offset = position - parentProperties.left;

        closest.style.left = `${ offset }px`;
        this.renderProgressBar();
        this.changeCurrentValue( offset );
    }

    changePosition() {
        let { canMove } = this.options;
        canMove = false;
        this.options = Object.assign( this.options, { canMove } );
    }

    renderProgressBar() {
        const {
            firstSlider, secondSlider, parentProperties, progressBar,
        } = this.options;
        const firstSliderOffset = parseInt( firstSlider.getBoundingClientRect().left, 10 );
        const secondSliderOffset = parseInt( secondSlider.getBoundingClientRect().left, 10 );

        const minimumOffsetValue = Math.min( firstSliderOffset, secondSliderOffset );
        const maximumOffsetValue = Math.max( firstSliderOffset, secondSliderOffset );

        progressBar.style.width = `${ maximumOffsetValue - minimumOffsetValue }px`;
        progressBar.style.left = `${ minimumOffsetValue - parentProperties.left }px`;
    }

    changeCurrentValue( leftOffset ) {
        const {
            maximumValue, closest, parentWidth,
        } = this.options;
        const unitPerPixel = maximumValue / parseInt( parentWidth, 10 );

        const currentValueElement = closest.querySelector( ".slider-value" );
        currentValueElement.innerHTML = `${ Math.round( leftOffset * unitPerPixel ) }`;
    }

    addEvents() {
        const { rangeContainer } = this.options;

        rangeContainer.addEventListener( "mousedown", this.setInitialCoordinates );
        body.addEventListener( "mousemove", this.moveSlider );
        body.addEventListener( "mouseup", this.changePosition );
    }
}
