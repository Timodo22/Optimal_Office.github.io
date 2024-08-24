
//$('div#preloader').delay(1800).fadeOut('fast');

jQuery( document ).ready( function( $ ) {
	
	// Show preloader animation 1.8s long
	$('div#preloader').css('visibility','visible').delay(1800).fadeOut('fast');
	
	$( '.navbar-toggle' ).click( function( e ) {
		e.preventDefault();
		$( 'body' ).toggleClass( 'is-active' );
		$('.menuBox').toggleClass('animate-in');
		$( '.navbar-toggle' ).toggleClass( 'collapsed' );
	} );

	$( '.js-hover-toggle' ).hover(function() {
		$( 'body' ).toggleClass( 'is-hover' );
	});


	$('.animate-heading').delay(300).queue(function(next) {
		$(this).addClass('text-animation');
		next();
	});

	$('.animate-heading').delay(800).queue(function(next) {
		$(this).addClass('text-animation2');
		next();
	});

	wow = new WOW(
		{
			boxClass: 'wow',      // default
			animateClass: 'animated', // default
			offset: 0,          // default
			mobile: true,       // default
			live: true        // default
		}
	);
	wow.init();

	$('.js-parallax-slide').paroller();

	$( 'a.js-slide-bottom' ).on( 'click', function( event ) {
		if ( this.hash !== "" ) {
			event.preventDefault();
			var hash = this.hash;
			$( 'html, body' ).animate( {
				scrollTop: $( hash ).offset().top
			}, 800, function() {
				window.location.hash = hash;
			} );
		}
	} );

	Splitting();

	$('.js-gallery-slider').slick({
		rows:0,
		variableWidth: true,
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">keyboard_arrow_left</button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button">keyboard_arrow_right</button>',
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnFocus: false,
		pauseOnHover: false,
		swipeToSlide : true,
		touchMove : true,
	});


	$('.js-image-slider').slick({
		rows:0,
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">keyboard_arrow_left</button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button">keyboard_arrow_right</button>',
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnFocus : false,
		pauseOnHover: false,
		swipeToSlide : true,
		touchMove : true,
	});



	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.className += "no-touch";
	}


	// Back to top button
	window.onscroll = function() {
	  	if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)  {
			$('#backToTop').addClass('show');
			$('#headerCta').addClass('scrolled');
		}
		else {
			$('#backToTop').removeClass('show');
			$('#headerCta').removeClass('scrolled');
		}
	}
	
	$( '#backToTop' ).on( 'click', function( event ) {
		$( 'html, body' ).animate( { scrollTop: 0}, 800);
	});
	
	/********************************************************
	Trigger GA goal when button clicked
	********************************************************/	
	$('a[data-trigger-goal]').click( function( e ) {
		var value = $(this).attr('data-trigger-goal');
		triggerGoal('button','click',value);
	});
	
	// Youtube popup
	$('.popup-youtube').magnificPopup({
//		  disableOn: 700,
	  type: 'iframe',
	  mainClass: 'my-mfp-zoom-in',
	  removalDelay: 300,
	  preloader: false,
	  fixedContentPos: false
	});
	
	
	/********************************************************
	Date CTA request
	********************************************************/
	// Post
	$('.miniFormDate').submit(function(event){

		// Prevent direct posting
		event.preventDefault();
		
		// Post form
		var url = root+'ajax_actions/date-cta=1';
		var form = $(this).parent();
		var output = $(this).attr('data-trigger-goal');
		
		// Specific CTA url?
	    if ($(this).find('[name=interest-cta]').length) url = root+'ajax_actions/interest-cta=1';

		// Trigger gtag conversion
		console.log('Triggering gtag submit-conversion for '+output);
		gtag_report_conversion(output);
		

         $.ajax({ url: url, type:'POST', data: $(this).serialize(),
             success: function(output){
				// Success
				if (output==1) {
					// Show success message
					form.replaceWith( "<p>Bedankt! We sturen je z.s.m. welke ruimtes er beschikbaar zijn. Als je het nu wilt weten, stuur dan een WhatsApp bericht naar 040 240 5017</p>" );
					//if (root.indexOf('/nl')!=-1) form.replaceWith( "<p class='small'>Bedankt!</p>" );
					//else form.replaceWith( "<p class='small'>Thanks!</p>" );
					// Trigger GA goal
					//triggerGoal('contact','footer form submit');
					
				}
				// Error
				else { alert(output);console.log(output);form.shake();alert(output); }
					
             }
         });
	});
	
	
} );