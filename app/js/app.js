import $ from 'jquery'
window.jQuery = $
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

window.onload = () => {

	let logoRowTop = $('.logo-row').offset().top;

	let logoDefaultScale = $('.logo-block .logo').css('transform'),
			scaleCoef = parseFloat(logoDefaultScale.replace('matrix(', '').replace(')', '').split(', ')[0]);

	function scaleLogo(scrTop) {

		if ( scrTop >= logoRowTop ) {
			$('.logo-block').addClass('no-fixed')
		}
		else {
			let scaleDynamicCoef = scrTop / logoRowTop * ( 1 - scaleCoef ) + scaleCoef ;
			$('.logo-block').removeClass('no-fixed');
			$('.logo-block .logo').css('transform', `scale(${scaleDynamicCoef})`)
		}

	}

	$(window).on('scroll', function() {
		let scrTop = $(window).scrollTop();
		scaleLogo(scrTop)
	});

}
