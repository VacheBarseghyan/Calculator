function negate() {
    var display = document.getElementById("display");
    var currentValue = parseFloat(display.value);
    display.value = -currentValue;
}

function calculatePercent() {
    var display = document.getElementById("display");
    var currentValue = parseFloat(display.value);
    var percentValue = currentValue / 100;
    display.value = percentValue;
}