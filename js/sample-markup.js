export function createMarkup( minimum, maximum, first, second ) {
    return `<div class="slider-container">
        <div class="range-value">
            <h2>min</h2>
            <span class="min-value">${ minimum }</span>
        </div>
        <div class="range-container">
            <div class="draggable">
                <div class="slider-value">
                    ${ first }
                </div>
                <div class="slider-handle"></div>
            </div>
            <div class="draggable second">
                <div class="slider-value">
                    ${ second }
                </div>
                <div class="slider-handle"></div>
            </div>
            <div class="progress-bar">
            </div>
        </div>
        <div class="range-value">
            <h2>max</h2>
            <span class="max-value">${ maximum }</span>
        </div>
    </div>`;
}
