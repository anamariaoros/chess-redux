import { JSDOM } from "jsdom";

const sampleDom = `<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <div class="custom-slider-container">
    </div>
</body>
</html>`;

const dom = new JSDOM( sampleDom );
const { window } = dom;
const { document } = dom.window;

global.document = document;
global.window = window;

export {
    window, document,
};
