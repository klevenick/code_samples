$(document).ready(function () {
  var $document = $(document);
  var $window = $(window);
  var $videoWrapper = $('.ec-video__wrapper');

  /*
  / Concatenate Title
  / Variable title length, so cut off after 97 characters
  */
  var concatTitle = function(title) {
    var title = title;
    var numOfWords = title.length
    var maxCharacters = 97;
    var newTitle = title;

    if(numOfWords > maxCharacters) {
      newTitle = title.substring(0,maxCharacters);

      if(newTitle.substring(maxCharacters-1) == " ") {
        newTitle = newTitle.substring(0, maxCharacters-1);
      }
      newTitle = newTitle + "...";
    }

    return newTitle;
  }

  /*
  / Format duration
  / Convert duration to minutes and seconds
  */
  var formatDuration = function(time) {
    var millis = time;
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }

  /*
  / Main Video Wrapper events
  */

  if($videoWrapper) {

    $videoWrapper.each(function(index,elem) {
      var $elem = $(elem);
      var $videoMain = $elem.find('.ec-video__main');
      var $videoPlayer = $videoMain.find('.ec-video__main__player');
      var $videoEl = $videoPlayer.find('video');
      var $videoTitle = $elem.find('.ec-video__main__title__text');
      var $videoDesc = $elem.find('.ec-video__main__description__text');
      var $playOverlay = $videoMain.find('.ec-video__main__play-overlay');
      var $playOverlayButton = $playOverlay.find('.ec-video__main__play');
      var $videoRelated = $elem.find('.ec-video__related');
      var $thumbCarousel = $videoRelated.find('.ec-video__related__carousel');
      var $carouselButtons;
      var $prev = $elem.closest('.slick-prev');
      var $prevArrow = $prev.find('svg')
      var $next = $elem.closest('.slick-next');
      var $nextArrow = $next.find('svg');
      var $currentActive;
      var $playButton = $("#play-pause");
      var videoOverlay = $('.ec-video__main__play-overlay');
      var $beetSpan = videoOverlay.find('.ec-button-beet');
      var $buttonText = videoOverlay.find('.button_text');
      var $buttonSVG = videoOverlay.find('.ec-button svg');
      var $carouselItems = $thumbCarousel.find('.ec-video__related__item');

      var arrowSVG = '<svg width="11px" height="16px" viewBox="0 0 11 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Combined Shape</title><desc>Created with Sketch.</desc><defs></defs><g id="🖥-Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Type---Updates-(Condensed-Article)-No-titlte---centered" transform="translate(-335.000000, -1206.000000)" fill="#003C5C"><g id="Gallery" transform="translate(320.000000, 1159.000000)"><g id="left-arrow"><path d="M19.4683095,54.8639532 L25.0658947,49.2663679 L22.7995269,47 L15,54.7995269 L15.0644263,54.8639532 L15,54.9283795 L22.7995269,62.7279063 L25.0658947,60.4615385 L19.4683095,54.8639532 Z" id="Combined-Shape"></path></g></g></g></g></svg>';

      var video = document.getElementById("video");

     
      $videoEl.on('click', function() {
        if (video.paused == true) {
          // Play the video
          video.play();

          $playButton.addClass("playing");
        } else {
          // Pause the video
          video.pause();

          $playButton.removeClass("playing");
        }
      })
      // Animation for play button
      $playOverlay.mouseenter(function() {
        
        TweenMax.fromTo($beetSpan, .25, { right: "100%" }, { right: 0 });
        TweenMax.fromTo($buttonText, .25, { color: "#003c5c" }, { color: "#FFFFFF", delay: -.25});
        TweenMax.to($playOverlayButton, .25, {className: "+=hover", delay: -.25} );

      })
      .mouseleave(function() {
        
        TweenMax.fromTo($beetSpan, .25, { right: 0 }, { right: "100%" })
        TweenMax.fromTo($buttonText, .25, { color: "#FFFFFF" }, { color: "#003c5c", delay: -.25});
        TweenMax.to($playOverlayButton, .25, {className: "-=hover", delay: -.25} );

      })
      
      $playOverlay.on('click', function() {
        var $this = $(this);
        var title = $this.find(".ec-video__main__title").text();
        if (video.paused == true) {
          video.play();
          ga('send', 'event', 'video', 'play', title);
          TweenMax.to($playOverlayButton, .5, {autoAlpha: 0});
          $playOverlay.hide();
        } else {
          video.pause();
          $playOverlay.show();
          TweenMax.to($playOverlayButton, .5, {autoAlpha: 1});
        }
      });      

      // Setup carousel
      var setCarouselFunctions = function() {
        var $carouselItems = $thumbCarousel.find('.ec-video__related__item');
        var $arrows = $thumbCarousel.find('.video-arrow');
        var $img = $thumbCarousel.find('.ec-video__related__thumb');
        var timeout;


        $carouselItems.each(function(index, elem) {
          var $elem = $(elem);
          //var $overlay = $elem.find('.ec-video__related__thumb__overlay');
          var $title = $elem.find('.ec-video__related__title');
          var $img = $elem.find('.ec-video__related__thumb__img');
          var videoDuration = $elem.data('video-duration');
          var videoId = $elem.data('video-id');
          var videoUrl = $elem.data('video-url');
          var videoPoster = $elem.find('.ec-video__related__thumb__img').attr("src");
          var videoTitleShown = $elem.find('.ec-video__related__title');
          var $videoTitleShownH6 = videoTitleShown.find('h6');
          var $videoDurationText = $elem.find(".related_video_duration");
          var videoTitleShownText = $videoTitleShownH6.text();
          var videoTitle = $elem.find('.ec-video__related__title__full').text();
          var videoDesc = $elem.find('.ec-video__related__description').text();


          videoTitleShownText = concatTitle(videoTitleShownText);
          $videoTitleShownH6.html(videoTitleShownText);
          videoDuration = formatDuration(videoDuration);
          $videoDurationText.html(videoDuration);

          
          // Update and play new video on carousel click
          $elem.on('click', function() {
            $currentActive = $carouselItems.closest('.active');
            
            if(!video.paused) {
              video.pause();
            }
            video.setAttribute("src", videoUrl);
            video.setAttribute('poster', videoPoster)
            $videoTitle.html(videoTitle);
            $videoDesc.html(videoDesc);
            video.load();
            $currentActive.removeClass("active");
            $elem.addClass("active");
            video.play();
            videoOverlay.hide();
          })

          $elem.mouseover(function() {
            TweenMax.to($img, .25, {opacity: .6, ease: Expo.EaseOut});
            TweenMax.to($title, .25, {className: "+=hover"});
          })
          .mouseout(function() {
            TweenMax.to($img, .25, {opacity: 1, ease: Expo.EaseOut });
            TweenMax.to($title, .25, {className: "-=hover"});
          })


        })// end carousel items each

        // Resize carousel arrows
        $window.on('load resize', function() {
          clearTimeout(timeout);
          timeout = setTimeout(function(){
            
            var thumbHeight = $img.height();
            $arrows.css("height", thumbHeight );
            
          }, 250);
        })
      }//end setCarouselFunctions
      

      $thumbCarousel.on('init', function() {
          setButtonAnimations();
          setCarouselFunctions();
      });
      $thumbCarousel.on('beforeChange', function() {
        setCarouselFunctions();
      })
      
      // Set carsousel breakpoint options
      $thumbCarousel.slick({
          lazyLoad: 'ondemand',
          slidesToShow: 4,
          initialSlide: 0,
          arrows: true,
          dots: true,
          prevArrow: '<button type="button" class="video-arrow slick-prev"><span class="ec-button-beet"></span><span class="video-arrow-svg prev-arrow">' + arrowSVG + '</span></button>',
          nextArrow: '<button type="button" class="video-arrow slick-next"><span class="ec-button-beet"></span><span class="video-arrow-svg next-arrow">' + arrowSVG + '</span></button>',
          responsive: [
          {
            breakpoint: 1280,
            settings: {
              lazyLoad: 'ondemand',
              slidesToShow: 3,
              arrows: true,
              dots: true,
              prevArrow: '<button type="button" class="video-arrow slick-prev"><span class="ec-button-beet"></span><span class="video-arrow-svg prev-arrow">' + arrowSVG + '</span></button>',
              nextArrow: '<button type="button" class="video-arrow slick-next"><span class="ec-button-beet"></span><span class="video-arrow-svg next-arrow">' + arrowSVG + '</span></button>',
              centerMode: true,
              centerPadding: '1rem'
            }
          },
          {
            breakpoint: 860,
            settings: {
              lazyLoad: 'ondemand',
              slidesToShow: 3,
              arrows: true,
              dots: true,
              prevArrow: '<button type="button" class="video-arrow slick-prev"><span class="ec-button-beet"></span><span class="video-arrow-svg prev-arrow">' + arrowSVG + '</span></button>',
              nextArrow: '<button type="button" class="video-arrow slick-next"><span class="ec-button-beet"></span><span class="video-arrow-svg next-arrow">' + arrowSVG + '</span></button>',
              centerMode: true,
              centerPadding: '1rem'
            }
          },
            {
            breakpoint: 790,
            settings: {
              lazyLoad: 'ondemand',
              slidesToShow: 3,
              arrows: false,
              dots: true,
              prevArrow: '<button type="button" class="video-arrow slick-prev"><span class="ec-button-beet"></span><span class="video-arrow-svg prev-arrow">' + arrowSVG + '</span></button>',
              nextArrow: '<button type="button" class="video-arrow slick-next"><span class="ec-button-beet"></span><span class="video-arrow-svg next-arrow">' + arrowSVG + '</span></button>',
              centerMode: true,
              centerPadding: '0rem',
            }
          },
            {
            breakpoint: 520,
            settings: {
              lazyLoad: 'ondemand',
              slidesToShow: 2,
              arrows: false,
              dots: true,
              centerMode: true,
              centerPadding: '1rem',
              prevArrow: '<button type="button" class="video-arrow slick-prev"><span class="ec-button-beet"></span><span class="video-arrow-svg prev-arrow">' + arrowSVG + '</span></button>',
              nextArrow: '<button type="button" class="video-arrow slick-next"><span class="ec-button-beet"></span><span class="video-arrow-svg next-arrow">' + arrowSVG + '</span></button>',
            }
          }
        ]
        });
      

      function setButtonAnimations() {
      $carouselButtons = $thumbCarousel.find("button");

      $carouselButtons.each(function(index,elem) {
        var $elem = $(elem);
        
        var $beetSpan = $elem.find('.ec-button-beet');
        var $arrow = $elem.find('svg path');

        var buttonAni = new TimelineMax({
          paused: true
        })
          .fromTo($beetSpan, .25, { right: "100%" }, { right: 0 })
          .fromTo($arrow, .25, { fill: "#003c5c" }, { fill: "#FFFFFF", delay: -.25});

        $elem.mouseover(function() {
          if(!$elem.hasClass('inactive')) {
            buttonAni.play();
          }
        });
        $elem.mouseout(function() {
          if(!$elem.hasClass('inactive')) {
            buttonAni.reverse();
          }
        });

        

      });

    }

      

    })
  


  }

})

