import $ from 'jquery'
window.jQuery = $
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

function init() {

	let logoRow = $('.logo-row'),
			logoRowTop = logoRow.offset().top,
			logoRowWidth = logoRow.width(),
			logoBlock = $('.logo-block');

	// let logoDefaultScale = $('.logo-block .logo').css('transform'),
	let logo = $('.logo-block .logo'),
			logoWidth = logo.width();
			// scaleCoef = parseFloat(logoDefaultScale.replace('matrix(', '').replace(')', '').split(', ')[0]);

	let bluredVideo = $('.blured-video');

	let menu = $('.main-menu'),
			menuTop = menu.offset().top,
			menuSticky = $('.main-menu-sticky'),
			menuStickyTop = menuSticky.offset().top;

	let sAbout = $('.s-about'),
			sAboutHeight = sAbout.outerHeight(),
			sAboutTop = sAbout.offset().top,
			aboutDate = $('.about-date'),
			aboutDateHeight = aboutDate.outerHeight(),
			aboutDateTop = aboutDate.offset().top;

	function scaleLogo(scrTop) {

		if ( scrTop >= logoRowTop ) {
			logoBlock.addClass('no-fixed');
		}
		else {
			// let scaleDynamicCoef = scrTop / logoRowTop * ( 1 - scaleCoef ) + scaleCoef ;
			let proport = scrTop / logoRowTop,
					scaleDynamicCoef = proport * ( logoRowWidth - logoWidth ) + logoWidth,
					blurPX = proport * 25;
			logoBlock.removeClass('no-fixed');
			// $('.logo-block .logo').css('transform', `scale(${scaleDynamicCoef})`)
			logo.css('width', `${scaleDynamicCoef}`);
			// $('.main-window-bg').get(0).style.setProperty('--main-window-blur', `${blurPX}px`);
			bluredVideo.css('opacity', scrTop / menuTop);
		}

		if ( scrTop >= menuTop ) {
			menuSticky.addClass('fixed');
			bluredVideo.addClass('full-blured')
		}
		else {
			menuSticky.removeClass('fixed');
			bluredVideo.removeClass('full-blured')
		}

	}

	function animateSAbout(scrTop) {

		let topAnimate = scrTop - aboutDateTop + $(window).height();

		let transformAboutDate = topAnimate > 0 ? topAnimate : 0;

		if ( scrTop >= sAboutTop - $(window).height() / 2 ) {
			sAbout.addClass('animate')
		}
		else {
			sAbout.removeClass('animate')
		}

		$('.about-date').css('transform', `translate3d(${transformAboutDate / 5}px, 0, 0)`)
	}

	let windowTop = $(window).scrollTop();

	scaleLogo(windowTop);
	animateSAbout(windowTop);

	$(window).on('scroll', function() {

		let scrTop = $(window).scrollTop();

		scaleLogo(scrTop);

		if ( scrTop > sAboutTop - $(window).height() && scrTop <= sAboutTop + sAboutHeight ) {
			animateSAbout(scrTop);
		}

	});

}

window.onload = () => {

	init();

}

window.onresize = () => {

	init();

}
