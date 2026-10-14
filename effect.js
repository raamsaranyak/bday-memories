// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
var BULB_COLORS = ['yellow', 'red', 'blue', 'green', 'pink', 'orange'];
var BALLOON_COUNT = 7;

// Calculate responsive balloon offsets so the 7 letters always fit on screen
function getBalloonOffsets() {
	var width = $(window).width();
	var spacing = Math.min(100, (width - 20) / BALLOON_COUNT);
	var start = -((BALLOON_COUNT - 1) / 2) * spacing;
	var offsets = [];
	for (var i = 0; i < BALLOON_COUNT; i++) {
		offsets.push(start + i * spacing);
	}
	return offsets;
}

function addToAllBulbs(classPrefix, classSuffix) {
	BULB_COLORS.forEach(function (color) {
		$('#bulb-' + color).addClass(classPrefix + color + (classSuffix || ''));
	});
}

// Balloon ids are "balloon-N" while flying and "balloon-N-placed" once
// they have been lined up to spell the greeting.
function balloonId(index, placed) {
	return '#balloon-' + index + (placed ? '-placed' : '');
}

function allBalloons(placed) {
	var ids = [];
	for (var i = 1; i <= BALLOON_COUNT; i++) {
		ids.push(balloonId(i, placed));
	}
	return $(ids.join(','));
}

function lineUpBalloons() {
	var centre = $(window).width() / 2;
	var offsets = getBalloonOffsets();
	var topPosition = $(window).width() < 768 ? 180 : 240;
	for (var i = 1; i <= BALLOON_COUNT; i++) {
		$(balloonId(i, true)).animate({ top: topPosition, left: centre + offsets[i - 1] }, 500);
	}
}

// Makes one balloon drift to random positions forever
function floatBalloon(selector) {
	var randomLeft = 1000 * Math.random();
	var randomBottom = 500 * Math.random();
	$(selector).animate({ left: randomLeft, bottom: randomBottom }, 5000, function () {
		floatBalloon(selector);
	});
}

// ---------------------------------------------------------------
// Page load
// ---------------------------------------------------------------
// Show content as soon as the DOM is ready instead of waiting for
// every image/audio file (window.load), which made loading feel slow.
$(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$(document).ready(function () {

	// Keep the lined-up balloons centred when the window is resized
	$(window).resize(function () {
		allBalloons(false).stop();
		lineUpBalloons();
	});

	// 1. Turn on lights
	$('#btn-turn-on-lights').click(function () {
		addToAllBulbs('bulb-glow-');
		$('body').addClass('bg-peach');
		$(this).fadeOut('slow').delay(2500).promise().done(function () {
			$('#btn-play-music').fadeIn('slow');
		});
	});

	// 2. Play music
	$('#btn-play-music').click(function () {
		$('.birthday-song')[0].play();
		addToAllBulbs('bulb-blink-');
		$('body').addClass('bg-peach-animated');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#btn-decorate').fadeIn('slow');
		});
	});

	// 3. Decorate (banner drops in)
	$('#btn-decorate').click(function () {
		$('.banner').addClass('banner-drop');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#btn-fly-balloons').fadeIn('slow');
		});
	});

	// 4. Fly with balloons
	$('#btn-fly-balloons').click(function () {
		$('.balloon-border').animate({ top: -500 }, 4000);

		$('#balloon-1, #balloon-4, #balloon-5, #balloon-7').addClass('balloon-sway-wide');
		$('#balloon-2, #balloon-3, #balloon-6').addClass('balloon-sway-narrow');

		for (var i = 1; i <= BALLOON_COUNT; i++) {
			floatBalloon(balloonId(i, false));
		}

		$(this).fadeOut('slow').delay(2500).promise().done(function () {
			$('#btn-show-cake').fadeIn('slow');
		});
	});

	// 5. Show cake
	$('#btn-show-cake').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(1500).promise().done(function () {
			$('#btn-light-candle').fadeIn('slow');
		});
	});

	// 6. Light the candles
	$('#btn-light-candle').click(function () {
		$('.flame').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function () {
			$('#btn-happy-birthday').fadeIn('slow');
		});
	});

	// 7. Happy Birthday (balloons line up and spell the greeting)
	$('#btn-happy-birthday').click(function () {
		allBalloons(false).stop();
		for (var i = 1; i <= BALLOON_COUNT; i++) {
			$(balloonId(i, false)).attr('id', 'balloon-' + i + '-placed');
		}
		lineUpBalloons();

		$('.balloon').css('opacity', '1.0');
		$('.balloon h2').css('opacity', '1.0').fadeIn(1500);
		$(this).fadeOut('slow').delay(1500).promise().done(function () {
			$('#btn-message').fadeIn('slow');
		});
	});

	// 8. Message (shows each line one after another)
	$('#btn-message').click(function () {
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function () {
			$('.message').fadeIn('slow');
		});

		// Number of <p> lines in the message, plus one so the final line
		// gets a chance to show before the loop ends.
		var LAST_LINE = $('.message p').length + 1;

		function showMessageLine(index) {
			$('.message p:nth-child(' + index + ')').fadeOut('slow').delay(400).promise().done(function () {
				var next = index + 1;
				$('.message p:nth-child(' + next + ')').fadeIn('slow').delay(500);

				if (next === LAST_LINE) {
					$('.message p:nth-child(' + (LAST_LINE - 1) + ')').fadeOut('slow').promise().done(function () {
						$('.cake').fadeIn('fast');
					});
				} else {
					showMessageLine(next);
				}
			});
		}

		showMessageLine(0);
	});
});
