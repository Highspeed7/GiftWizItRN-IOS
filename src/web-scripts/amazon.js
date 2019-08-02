export const amazonScript = (() => {
    return `(() => {
        var el = document.querySelector(".nav-input");
        if(el != null) {
            el.value = "Wagon Wheel"
            el.submit();
        }
    })()`
})()