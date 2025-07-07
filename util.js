var Util = {};

Util.getRandomIntBetweenInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Util.drawGuidelines = function(context) {
    var initialPosition = 100;
    // Líneas horizontales
    for (var i = 0; i < 5; i++) {
        context.beginPath();
        context.moveTo(0, initialPosition);
        context.lineTo(800, initialPosition);
        context.stroke();
        initialPosition += 100;
    }
    // Líneas verticales
    initialPosition = 160;
    for (var i = 0; i < 5; i++) {
        context.beginPath();
        context.moveTo(initialPosition, 0);
        context.lineTo(initialPosition, 600);
        context.stroke();
        initialPosition += GameConfig.scenario.lanesSize;
    }
};

Util.drawLog = function(context, text) {
    context.fillText(text, 680, 50);
};

Util.drawTextWithShadow = function(context, text, x, y, textColor, shadowOffsetX, shadowOffsetY, shadowColor) {
    context.save();
    context.fillStyle = shadowColor;
    context.fillText(text, x + shadowOffsetX, y + shadowOffsetY);
    context.fillStyle = textColor;
    context.fillText(text, x, y);
    context.restore();
};

Util.drawPressAnyKey = function(context) {
    context.save();
    context.globalAlpha = 0.5;
    context.fillRect(185, 470, 430, 40);
    context.globalAlpha = 1;
    Util.drawTextWithShadow(context, "PRESIONA PARA INICIAR", 200, 500, "yellow", 2, 2, "red");
    context.restore();
};
