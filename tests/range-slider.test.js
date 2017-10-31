import { expect } from "chai";
import { document } from "./testContext";
import { checkProperties } from "../js/utils";
import { createMarkup } from "../js/sample-markup";
import RangeSlider from "../js/range-slider";

describe( "Range Slider Component", () => {
    const mainContainer = document.querySelector( ".custom-slider-container" );

    describe( "Markup", () => {
        it( "should create a markup", () => {
            const expectedValues = [ 0, 500, 10, 350 ];

            const markup = createMarkup( ...expectedValues );
            mainContainer.innerHTML = markup;

            const actualValue = parseInt( mainContainer
                .querySelector( ".max-value" ).innerHTML, 10 );
            expect( actualValue ).to.be.equal( expectedValues[ 1 ] );
        } );

        it( "should not create markup if parent container doesn't exist", () => {
            const input = {
                containerName: ".some-class-name",
                sliderWidth: 500,
                minimumValue: 0,
                maximumValue: 500,
                firstHandleValue: 10,
                secondHandleValue: 350,
            };
            const parentContainer = document.querySelector( input.containerName );
            const expected = false;
            const actual = checkProperties( input );

            /* eslint no-unused-expressions: "off" */
            expect( parentContainer ).to.be.null;
            expect( actual ).to.be.equal( expected );
        } );
    } );

    describe( "Range Slider Manipulation", () => {
        let input;
        let testSlider;
        let parentWidth;
        let unitPerPixel;

        beforeEach( () => {
            input = {
                firstHandleValue: 10,
                secondHandleValue: 350,
                containerName: ".custom-slider-container",
                sliderWidth: 500,
                minimumValue: 0,
                maximumValue: 500,
            };
            testSlider = new RangeSlider( input );
            testSlider.init();

            ( { parentWidth } = testSlider.options );
            parentWidth = 213; // jsdom css issues, must set it manually
            testSlider.options = Object.assign( testSlider.options, { parentWidth } );

            unitPerPixel = input.maximumValue / parseInt( parentWidth, 10 );
        } );

        it( "should create a valid range slider object", () => {
            const requiredKeys = [
                "firstHandleValue",
                "secondHandleValue",
                "containerName",
                "sliderWidth",
                "minimumValue",
                "maximumValue",
            ];

            const expected = {
                firstHandleValue: 10,
                secondHandleValue: 350,
                containerName: ".custom-slider-container",
                sliderWidth: 500,
                minimumValue: 0,
                maximumValue: 500,
            };
            const actual = new RangeSlider( expected );
            expect( actual.options ).to.have.all.keys( ...requiredKeys );
        } );

        it( "should set default values if not specified", () => {
            const expected = {
                containerName: ".custom-slider-container",
                sliderWidth: 700,
                minimumValue: 0,
                maximumValue: 1000,
            };
            const actual = new RangeSlider( expected );
            const { firstHandleValue: actualHandleValue } = actual.options;
            expect( actualHandleValue ).to.satisfy( ( value ) =>
                value === expected.minimumValue && value !== undefined );
        } );

        it( "should initialize slider features if valid parameters", () => {
            const validObject = {
                containerName: ".custom-slider-container",
                sliderWidth: 700,
                minimumValue: 0,
                maximumValue: 1000,
            };
            const actual = new RangeSlider( validObject );
            actual.init();

            const expectedProperty = "canMove";
            expect( actual.options ).to.have.own.property( expectedProperty );
        } );

        it( "should not initialize slider if invalid parameters", () => {
            const invalidObject = {
                containerName: ".custom-slider-container",
                sliderWidth: "not a number",
                minimumValue: 0,
                maximumValue: 1000,
            };
            const actual = new RangeSlider( invalidObject );
            actual.init();

            const expectedProperty = "parentWidth";
            expect( actual.options ).to.not.have.own.property( expectedProperty );
        } );

        it( "should compute the left offset of handlers", () => {
            const { firstSlider } = testSlider.options;
            const firstHandleValue = 100;
            const secondHandleValue = 110;
            testSlider.options = Object.assign(
                testSlider.options,
                { firstHandleValue, secondHandleValue },
            );

            testSlider.computeLeftOffset();

            const expectedComputedValue = parseInt( firstHandleValue / unitPerPixel, 10 );
            const actualComputedValue = parseInt( firstSlider.style.left, 10 );
            expect( actualComputedValue ).to.be.equal( expectedComputedValue );
        } );

        it( "should change the current slider handle value", () => {
            const { firstSlider } = testSlider.options;
            const closest = firstSlider;
            testSlider.options = Object.assign( testSlider.options, { closest, parentWidth } );
            const inputOffset = 15;
            const expectedValue = Math.round( inputOffset * unitPerPixel );

            testSlider.changeCurrentValue( inputOffset );
            const actualValue = parseInt( closest.querySelector( ".slider-value" ).innerHTML, 10 );
            expect( actualValue ).to.be.equal( expectedValue );
        } );
    } );
} );
