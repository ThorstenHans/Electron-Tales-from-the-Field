const sass = require('node-sass');

const init = () => {
    window.bridge = {
        compile: compileSassToCss
    };
}

const compileSassToCss = (sassCode) => {
    return sass.renderSync({
        data: sassCode
    })
};

init();
