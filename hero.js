var doneShow;
var scrollLock;
/******HERO******/

$(document).ready(function () {
  var $document = $(document);
  var $window = $(window);
  var $html = $('html');
  var $body = $('body');
  var $bodyFulLContainer = $('.body__full__container')
  var $header = $('.ec-header');
  var $nav = $('.ec-nav');
  var $homeHero = $('.ec-home-hero');
  var $homeCurtain = $('.ec-home-hero__curtain');
  var $slideTitles = $('.ec-home-hero__slide__title');
  var $progressBar = $('.ec-home-hero__progress');
  var $progressBars = $('.ec-bar-click');
  var $heroWrapper = $('.ec-home-hero__wrapper');

  slideNum = 1;
  var curtainDown = true;
  var doneShow = false;


  // Init ScrollMagic
  var hero_controller = new ScrollMagic.Controller();

  if($homeHero.length) {
    var hideOverflow = function() {

      /* 
      / If the show is already done, turn it back on when trigger fires.
      / This turns the show back on when scrolling to the top.
      / If the show is not already done, set a delay to wait for the scroll trigger to stop
      / then end the show and free the scroll-lock.
      */
      if(doneShow == true) {
        $heroWrapper.css("overflow-y", "scroll");
        setTimeout(function() {
        doneShow = false;
        }, 400)
      }
      else {
        setTimeout(function() {
        $heroWrapper.css("overflow-y", "hidden");
        doneShow = true;
        ga('send', 'event', 'home-scroll', 'finished');
        }, 750)
      }
      
    }

   
    $header.addClass('fixed');
    $nav.removeClass('ec-nav-lightBG').addClass('ec-nav-darkBG');

    TweenMax.to(".ec-home-hero__slide__title--1", .5, { opacity: 1});


    new ScrollMagic.Scene({
      triggerElement: ".ec-home-hero__slide--4",
      triggerHook: "0",
      offset: "5px"
    })
    .on("start", hideOverflow)
    .addTo(hero_controller);


     //Pull back the curtain animation
    new TimelineMax()
    .fromTo($homeCurtain, 1, {autoAlpha: 1}, {autoAlpha: 0, ease: Power1.easeIn})
    .set($homeCurtain, {zIndex: 0})
    .fromTo(".ec-home-hero__slide__title--1", .25, {autoAlpha: 0}, {autoAlpha: 1});


    var fadeTitle1 = TweenMax.fromTo(".ec-home-hero__slide__title--1", .25, { opacity: 1}, {opacity: 0});
    new ScrollMagic.Scene({
      triggerElement: ".ec-home-hero__slide__title--1",
      triggerHook: ".15"
    })
    .setTween(fadeTitle1)
    .addTo(hero_controller);

    var fadeTitle2 = new TimelineMax()
      .fromTo(".ec-home-hero__slide__title--2", .25, { opacity: 0 }, {opacity: 1})
      .fromTo(".ec-home-hero__slide__stat--2", .25, { opacity: 0 }, {opacity: 1, delay: -.25})
      .fromTo(".ec-home-hero__slide__title--2", .1, { immediateRender: false, opacity: 1 }, {opacity: 0})
      .fromTo(".ec-home-hero__slide__stat--2", .1, { immediateRender: false, opacity: 1 }, {opacity: 0, delay: -.1});
    
    new ScrollMagic.Scene({
      triggerElement: ".ec-home-hero__slide__title--2",
      triggerHook: ".9",
      duration: "90%"
    })
    .setTween(fadeTitle2)
    .addTo(hero_controller);

    var fadeTitle3 = new TimelineMax()
      .fromTo(".ec-home-hero__slide__title--3", .25, { opacity: 0 }, {opacity: 1})
      .fromTo(".ec-home-hero__slide__stat--3", .25, { opacity: 0 }, {opacity: 1, delay: -.25})
      .fromTo(".ec-home-hero__slide__title--3", .1, { immediateRender: false, opacity: 1 }, {opacity: 0})
      .fromTo(".ec-home-hero__slide__stat--3", .1, { immediateRender: false, opacity: 1 }, {opacity: 0, delay: -.1});
    
    new ScrollMagic.Scene({
      triggerElement: ".ec-home-hero__slide__title--3",
      triggerHook: ".9",
      duration: "90%"
    })
    .setTween(fadeTitle3)
    .addTo(hero_controller);
    
    var fadeTitle4 = new TimelineMax()
          .fromTo(".ec-home-hero__slide__title--4", .25, { opacity: 0 }, {opacity: 1})
          .fromTo(".ec-home-hero__slide__stat--4", .25, { opacity: 0 }, {opacity: 1, delay: -.25})
          .fromTo(".ec-home-hero__slide__title--4", .1, { immediateRender: false, opacity: 1 }, {opacity: 0})
          .fromTo(".ec-home-hero__slide__stat--4", .1, { immediateRender: false, opacity: 1 }, {opacity: 0, delay: -.1});
        
        new ScrollMagic.Scene({
          triggerElement: ".ec-home-hero__slide__title--4",
          triggerHook: ".9",
          duration: "120%"
        })
        .setTween(fadeTitle4)
        .addTo(hero_controller);

   
    var curtainStatus = function() {
      if(curtainDown) {
        curtainDown = false;
      }
    }
    
      //Nav Slide away
    
    if(!Modernizr.touch) {
      var returnNav = new TimelineMax()
        .to(".ec-header", 1 , {y: '-=300'}, {className: '-=fixed'});
      new ScrollMagic.Scene ({
          triggerElement: ".ec-home-hero__nav-clear",
          triggerHook: '.9',
          duration: 300
        })
        .setTween(returnNav)
        .addTo(hero_controller);
    }
    else {
      var returnNav = new TimelineMax()
        .to(".ec-header", 1 , {y: '-=300'}, {className: '-=fixed'});
      new ScrollMagic.Scene ({
          triggerElement: ".ec-home-hero__nav-clear",
          triggerHook: '.9',
          offset: 300,
          duration: 300
        })
        .setTween(returnNav)
        .addTo(hero_controller);
      
    }
    

  }
})