const compileSass = () => {
    const scssCode = document.querySelector('#sasscode').value;
    const target = document.querySelector('#csscode');
    const result = window.bridge.compile(scssCode);
    target.value = result.css.toString();
};
