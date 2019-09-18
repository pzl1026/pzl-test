function debounce (fn, delay = 500) {
    var timer = null;

    return function(...args) {
        clearTimeout(timer);
        setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}