export function random(x, y) {
    if (typeof y === "undefined") {
        if (x instanceof Array) {
            let index = Math.floor(Math.random() * x.length);
            return x[index];
        } else {
            return Math.floor(Math.random() * x);
        }
    } else {
        return Math.floor(Math.random() * (y - x) + x);
    }
}