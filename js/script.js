$(document).ready(function() {
  var $latestNews = $(".latest-news");
  clearHero = $('.hero').outerHeight();
  console.log($(window).scrollTop());

  $latestNews.hide();

  setTimeout(function() {
    $(".headline").fadeOut(3500);
    $latestNews.fadeIn(5000);
  }, 500);

  $(window).scroll(function() {
    console.log($(window).scrollTop());
    if ( $(window).scrollTop() == 0) {
      console.log('first')
      $('nav').removeClass('fixed-top').next();
      $('nav').addClass('fixed-bottom').next();
    } else if ( ($(window).scrollTop() - clearHero) < 0 ) {
      console.log("riding the hero");
      $('nav').removeClass('fixed-bottom').next();
      $('nav').removeClass('fixed-top').next();
    } else {
      console.log("fixed-top")
      $('nav').addClass('fixed-top').next();
    } 
  });

});