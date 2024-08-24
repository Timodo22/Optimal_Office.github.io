/* Melt JS */
jQuery( document ).ready( function( $ ) {
	

	/********************************************************
	Video (toggle mute)
	********************************************************/	
	$('.mute').click(function(e){

		e.preventDefault();
		
		$( ".mainVideo" ).each(function() {

			if ($(this).parent().css('display')=='block') {
				if( $(this).prop('muted')) $(this).prop('muted', false);
				else $(this).prop('muted', true);
			}
		});
		$('a.mute span').toggleClass('muted');
	});
	  
	
	
	
} );