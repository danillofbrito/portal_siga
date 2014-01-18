/*
------------------------------------------------------------
    Peak for Drupal 7.x - Version 1.1                           
    Copyright (C) 2012 esors.com All Rights Reserved.           
    @license - Copyrighted Commercial Software                   
------------------------------------------------------------
    Theme Name: Peak                                            
    Author: ESORS                                           
    Date: 25th July 2012                                        
    Website: http://www.esors.com/                              
------------------------------------------------------------
    This file may not be redistributed in whole or   
    significant part.                                            
------------------------------------------------------------*/    

jQuery(function () {
	jQuery('#showcase img').hide();		
});

jQuery(window).bind("load", function() {
	jQuery('#showcase .kwicks img:hidden').fadeIn(800);
	jQuery('#showcase .short-description').css({ display: 'inline'});
	jQuery('#showcase .description').css({ display: 'inline'});
});

jQuery(window).load(function() {
  jQuery('#slider').nivoSlider( {
    effect: 'boxRandom',
    animSpeed: 600, // Slide transition speed
    pauseTime: 9000, // How long each slide will show
    startSlide: 0,
    directionNav: false,
    captionOpacity: 0.8,
    customChange: function(){
      Cufon.replace('.nivo-caption h3');
    }
  });
});

(function(jQuery) {
  jQuery().ready(function() {

    jQuery('ul.accordion .content').hide();
	jQuery('ul.accordion .first .content').show();
    jQuery('ul.accordion .first h3 a').addClass('selected');

    jQuery('ul.accordion h3 a').click(function(){
      if (jQuery(this).hasClass('selected')) {
        jQuery(this).removeClass('selected');
        jQuery(this).parent().next().slideUp();
      } else {
        jQuery('ul.accordion h3 a').removeClass('selected');
        jQuery(this).addClass('selected');
        jQuery('ul.accordion .content').slideUp();
        jQuery(this).parent().next().slideDown();
      }
      return false;
    });

	jQuery("ul.menu").superfish({ 
      delay: 1000,
      animation: {opacity:'show',height:'show'},
      speed: 'slow',
      autoArrows: false,
      dropShadows: false
    });

	jQuery('.kwicks').kwicks({
	  max: 480,	  //480 for five slides, 595 for four slides, 710 for three slides
	  spacing: 0
	});

	jQuery('.kwicks li').hover(function() {
	  jQuery(".short-description", this).stop().animate({top:'310px'},{queue:false,duration:250});
	  jQuery(".description", this).stop().animate({top:'200px'},{queue:false,duration:250});
	},function(){
	  jQuery(".short-description", this).stop().animate({top:'255px'},{queue:false,duration:250});
	  jQuery(".description", this).stop().animate({top:'265px'},{queue:false,duration:250});
	});	

  });

})(jQuery);