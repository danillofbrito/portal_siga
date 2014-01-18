/*!
	Colorbox v1.4.33 - 2013-10-31
	jQuery lightbox and modal window plugin
	(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(z+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function l(e,t){return e.photo||e.photoRegex.test(t)}function s(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),lt.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),z=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),z=k.index(N),-1===z&&(k=k.add(N),z=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(y):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(st,"LoadedContent","width:0; height:0; overflow:hidden"),y.css({width:"",height:""}).append(H),O=x.height()+C.height()+y.outerHeight(!0)-y.height(),_=b.width()+T.width()+y.outerWidth(!0)-y.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),lt.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&lt.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(st).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(st,"Overlay").hide(),F=e([o(st,"LoadingOverlay")[0],o(st,"LoadingGraphic")[0]]),v=o(st,"Wrapper"),y=o(st,"Content").append(L=o(st,"Title"),S=o(st,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),F),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(st).append(o(st,"TopLeft"),x=o(st,"TopCenter"),o(st,"TopRight")),o(st,!1,"clear:left").append(b=o(st,"MiddleLeft"),y,T=o(st,"MiddleRight")),o(st,!1,"clear:left").append(o(st,"BottomLeft"),C=o(st,"BottomCenter"),o(st,"BottomRight"))).find("div div").css({"float":"left"}),W=o(st,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,W)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,j=!1,N=k[z],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){F.show()},100),B.inline?(a=o(st).hide().insertBefore(e(n)[0]),lt.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):l(B,n)?(n=s(B,n),j=t.createElement("img"),e(j).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(st,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&j.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(j.height=j.height/i.devicePixelRatio,j.width=j.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){j.height-=j.height*t,j.width-=j.width*t},B.mw&&j.width>B.mw&&(t=(j.width-B.mw)/j.width,r()),B.mh&&j.height>B.mh&&(t=(j.height-B.mh)/j.height,r())),B.h&&(j.style.marginTop=Math.max(B.mh-j.height,0)/2+"px"),k[1]&&(B.loop||k[z+1])&&(j.style.cursor="pointer",j.onclick=function(){Q.next()}),j.style.width=j.width+"px",j.style.height=j.height+"px",setTimeout(function(){u(j)},1))}),setTimeout(function(){j.src=n},1)):n&&W.load(n,B.data,function(t,i){f===at&&u("error"===i?o(st,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,A,N,z,j,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",lt=e("<a/>"),st="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[z+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(s).one(s,o),lt.bind(ot,t).bind(it,e),g.removeClass(l+"off").addClass(l+"on")}function o(){e(),lt.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(s).one(s,function(){Q.next(),i()}),g.removeClass(l+"on").addClass(l+"off")}function n(){r=!1,M.hide(),e(),lt.unbind(ot,t).unbind(it,e),g.removeClass(l+"off "+l+"on")}var r,h,l=Z+"Slideshow_",s="click."+Z;return function(){r?B.slideshow||(lt.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,lt.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){x[0].style.width=C[0].style.width=y[0].style.width=parseInt(g[0].style.width,10)-_+"px",y[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,l,s,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),l=E.scrollTop(),s=E.scrollLeft(),B.fixed?(c.top-=l,c.left-=s,g.css({position:"fixed"})):(a=l,d=s,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,Q.position)},1),i&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(st,"LoadedContent").append(i),H.hide().appendTo(W.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(y),W.hide(),e(j).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),F.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",z+1).replace("{total}",a)).show(),R[B.loop||a-1>z?"show":"hide"]().html(B.next),I[B.loop||z?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&l(r,i)&&(i=s(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),lt.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[z+1])&&(z=r(1),u(k[z]))},Q.prev=function(){!$&&k[1]&&(B.loop||z)&&(z=r(-1),u(k[z]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;

/**
 * Plugin written by the great jqueryfordesigners.com
 * http://jqueryfordesigners.com/jquery-infinite-carousel/
 *
 * Slightly addapted for our use case
 */
(function ($) {
  $.fn.infiniteCarousel = function () {

      function repeat(str, num) {
          return new Array( num + 1 ).join( str );
      }

      return this.each(function () {

          var $wrapper = $('> div', this).css('overflow', 'hidden'),
              $slider = $wrapper.find('> ul'),
              $items = $slider.find('> li'),
              $single = $items.filter(':first'),

              singleWidth = $single.outerWidth(),
              visible = Math.ceil($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
              currentPage = 1,
              pages = Math.ceil($items.length / visible);


          // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
          if (($items.length % visible) != 0) {
              $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
              $items = $slider.find('> li');
          }

          // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
          $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
          $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
          $items = $slider.find('> li'); // reselect

          // 3. Set the left position to the first 'real' item
          $wrapper.scrollLeft(singleWidth * visible);

          // 4. paging function
          function gotoPage(page) {
              var dir = page < currentPage ? -1 : 1,
                  n = Math.abs(currentPage - page),
                  left = singleWidth * dir * visible * n;

              $wrapper.filter(':not(:animated)').animate({
                  scrollLeft : '+=' + left
              }, 500, function () {
                  if (page == 0) {
                      $wrapper.scrollLeft(singleWidth * visible * pages);
                      page = pages;
                  } else if (page > pages) {
                      $wrapper.scrollLeft(singleWidth * visible);
                      // reset back to start position
                      page = 1;
                  }

                  currentPage = page;
              });

              return false;
          }

          $wrapper.after('<a class="arrow back" title="'+ Drupal.t('Previous page') +'">&lt;</a><a class="arrow forward" title="'+ Drupal.t('Next page') +'">&gt;</a>');

          // 5. Bind to the forward and back buttons
          $('a.back', this).click(function () {
              return gotoPage(currentPage - 1);
          });

          $('a.forward', this).click(function () {
              return gotoPage(currentPage + 1);
          });

          // create a public interface to move to a specific page
          $(this).bind('goto', function (event, page) {
              gotoPage(page);
          });

          // custom events to trigger next and prev pages
          $(this).bind('next', function () {
            gotoPage(currentPage + 1);
          });
          $(this).bind('prev', function () {
            gotoPage(currentPage - 1);
          })
      });
  };
})(jQuery);
;

Drupal.behaviors.galleryformatter = {
  attach: function (context) {
    // We must wait for everything to load in order to get images' dimensions.
    (jQuery)(window).bind('load', function() {
      (jQuery)('.galleryformatter:not(.gallery-processed)', context).each(function(){
        Drupal.galleryformatter.prepare(this);
      }).addClass('gallery-processed');
    });
  }
};

Drupal.galleryformatter = Drupal.galleryformatter || {};

// setting up the main behaviour
Drupal.galleryformatter.prepare = function(el) {
  (function ($) {
    // var $settings = Drupal.settings.galleryformatter;
    $el = $(el);
    var $slides = $('li.gallery-slide', $el);
    var $slideContainer = $('div.gallery-slides', $el);

    var $thumbs = $('.gallery-thumbs', $el);
    var $thumbsLi = $('li', $thumbs);
    var thumbWidth = $thumbsLi.filter(':first').width() + 'px';
    var liWidth = $thumbsLi.outerWidth(); // includes padding
    var $wrapper = $('.wrapper', $el);
    var visibleWidth = $wrapper.outerWidth();

    /*
     * Only start the thumbs carrousel if needed
     */
    if (($thumbsLi.size() * liWidth) > $thumbs.width()) {
      $('ul', $thumbs).width('99999px');
      $thumbs.infiniteCarousel();
      $thumbsLi = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      $el = $(el);
      $thumbsLi = $('.gallery-thumbs ul li', $el);
    }

    $thumbsLi = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary

    $thumbsLi.each(function(){
      $(this).css({
          width: thumbWidth
        });
    });
    var $thumbslinks = $('a', $thumbsLi);

    /*
     * @TODO:
     * figure out how to get this into proper functions reusing selections
     */
    $thumbslinks.click(function(e){
      $hash = $(this.hash);
      if(!$hash.is(':visible')){
        $thumbsLi.removeClass('active');
        $(this).parent().addClass('active');
        $slides.filter(':visible').fadeOut('slow');
        $hash.fadeIn('slow');
        // set the slide container's height to allow use of portrait images
        $slideContainer.css("height",$hash.find('img').height());
        /*
         * @FIXME
         * Need to figure out a way to update the location bar of the browser, for bookmarking etc, without making the scroll jump
         * window.location.hash = this.hash; solution below does update the location, but makes the scroll jump.
         */
        // window.location.hash = this.hash;  // not sure if this is the best way to do it.
      }
      e.preventDefault();
    });

    /*
     *  Startup behaviour (when the page first loads)
     */
    if ($slides.length > 1) {
      $slides.hide(); // hide all slides
    }
    var $locationHash = window.location.hash; // if we are being deeplinked to a specific slide, capture that

    function showFirstSlide(){
      // Activate the first slide
      $('a', $thumbsLi.filter('.slide-0:not(".cloned")')).trigger('click');
     }

    // if we have a hash in the url
    if ($locationHash) {
      var $slideToShow = $slides.filter($locationHash);
      // if the hash corresponds to one of our slides
      if ($slideToShow.length > 0) {
        $slideToShow.show(); //  show that slide
        $thumbsLi.not($(".cloned")).find("a[href="+$locationHash+"]").parent().addClass('active'); // activate that thumbnail
        // set the slide container's height to allow use of portrait images
        $slideContainer.css("height", $slideToShow.find('img').height());
      }
      // otherwise the default
      else {
        showFirstSlide();
      }
    }
    // otherwise the default
    else {
      showFirstSlide();
    }

    /*
     * Create a public interface to move to the next and previous images
     */
    // Shows the previous slide and scrolls to the previous page if necessary
    $thumbs.bind('showPrev', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      var $prevThumbLi = $thumbsLi.filter('.active').prev(':not(".cloned, .empty, .active")');
      // if no results we are on the first element
      if(!$prevThumbLi.size()) {
        // select the last one
        $prevThumbLi = $thumbsLi.not('.empty, .cloned').filter(':last');
      }
      var $slideToClick = $('a', $prevThumbLi);
      var $prevIsVisible = (($prevThumbLi.get(0).offsetLeft >= currentScroll) && ($prevThumbLi.get(0).offsetLeft <= (visibleWidth + currentScroll)));
      if($prevIsVisible) {
        $slideToClick.trigger('click');
      }
      else {
        $thumbs.trigger('prev');
        $slideToClick.trigger('click');
      }
    });
    // Shows the next slide and scrolls to the next page if necessary
    $thumbs.bind('showNext', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      // this selector could be optimized perhaps, but
      var $nextThumbLi = $thumbsLi.filter('.active').next(':not(".cloned, .empty, .active")');
      // if no results we are on the last element
      if(!$nextThumbLi.size()) {
        // select the first one
        $nextThumbLi = $thumbsLi.not('.empty, .cloned').filter(':first');
      }

      var $slideToClick = $('a', $nextThumbLi);
      var $nextIsVisible = (($nextThumbLi.get(0).offsetLeft >= currentScroll) && ($nextThumbLi.get(0).offsetLeft <= (visibleWidth + currentScroll)));
      if($nextIsVisible) {
        var $slideToClick = $('a', $nextThumbLi);
        $('a', $nextThumbLi).trigger('click');
      }
      else {
        $thumbs.trigger('next');
        $slideToClick.trigger('click');
      }
    });

    $('.shownext + img', $slideContainer).click(function(){
      $thumbs.trigger('showNext');
    });

    if ($slides.length > 1) {
      // Setup buttons for next/prev slide
      $slideButtons = ('<a class="prev-slide slide-button" title="'+ Drupal.t('Previous image') +'">&lt;</a><a class="next-slide slide-button" title="'+ Drupal.t('Next image') +'">&gt;</a>');
      $('.gallery-slides', $el).append($slideButtons);
      // Trigger the appropiate events on click
      $('a.prev-slide', $el).click(function(){
        $thumbs.trigger('showPrev');
      });
      $('a.next-slide', $el).click(function(){
        $thumbs.trigger('showNext');
      });
    }
  })(jQuery);
}
;
