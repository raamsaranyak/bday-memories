function createSparkles() {
    var particles = $('#particles');
    if (particles.length === 0) return;
    particles.empty();
    for (var i = 0; i < 40; i++) {
        var dot = $('<div></div>');
        dot.css({
            position: 'absolute',
            width: Math.random() * 3 + 2 + 'px',
            height: Math.random() * 3 + 2 + 'px',
            background: 'white',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.6,
            animation: 'sparkle ' + (Math.random() * 1.5 + 1) + 's ease-in-out infinite',
            animationDelay: Math.random() * 1.5 + 's'
        });
        particles.append(dot);
    }
    if (!$('style#sparkle-style').length) {
        $('<style id="sparkle-style">@keyframes sparkle{0%,100%{opacity:0.2;transform:scale(0.5)}50%{opacity:1;transform:scale(1.2)}}</style>').appendTo('head');
    }
}

function createStickers() {
    var stickers = $('#stickers');
    if (stickers.length === 0) {
        stickers = $('<div id="stickers"></div>').appendTo('body');
        stickers.css({ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 });
    }
    stickers.empty();
    var stickerImgs = ['cake128.png', 'b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'b6.png', 'b7.png', 'bulb.png', 'vine.png', 'uggreen.png', 'banner.png'];
    for (var i = 0; i < 10; i++) {
        var img = stickerImgs[i % stickerImgs.length];
        var el = $('<img class="sticker">');
        el.attr('src', img);
        el.css({
            left: Math.random() * 90 + '%',
            top: Math.random() * 90 + '%',
            width: Math.random() * 30 + 18 + 'px',
            animationDuration: (Math.random() * 2 + 3.5) + 's',
            animationDelay: Math.random() * 2 + 's',
            opacity: 0.5 + Math.random() * 0.2
        });
        stickers.append(el);
    }
}

function createConfetti() {
    var layer = $('#confetti');
    if (layer.length === 0) {
        layer = $('<div id="confetti"></div>').appendTo('body');
        layer.css({ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: -4 });
    }
    layer.empty();
    var colors = ['#F2B300', '#0719D4', '#D14D39', '#8FAD00', '#8377E4', '#99C96A', '#20CFB4', '#FF69B4', '#FF4500'];
    for (var i = 0; i < 35; i++) {
        var piece = $('<div></div>');
        var size = Math.random() * 6 + 4;
        piece.css({
            position: 'absolute',
            top: '-40px',
            left: Math.random() * 100 + '%',
            width: size + 'px',
            height: (size * 0.5) + 'px',
            background: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.8,
            borderRadius: '2px',
            animation: 'confetti-fall ' + (Math.random() * 5 + 5) + 's linear infinite',
            animationDelay: -(Math.random() * 10) + 's'
        });
        layer.append(piece);
    }
    if (!$('style#confetti-style').length) {
        $('<style id="confetti-style">@keyframes confetti-fall{0%{transform:translateY(-40px) rotate(0deg) translateX(0)}25%{transform:translateY(25vh) rotate(90deg) translateX(20px)}50%{transform:translateY(50vh) rotate(180deg) translateX(-20px)}75%{transform:translateY(75vh) rotate(270deg) translateX(20px)}100%{transform:translateY(105vh) rotate(360deg) translateX(0)}}</style>').appendTo('head');
    }
}

$(document).ready(function() {
    createSparkles();
    createStickers();
    createConfetti();
});
