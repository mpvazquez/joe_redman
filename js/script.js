var photoView = function(number){
  this.imageNumber = number;
  this.el = undefined;
}
photoView.prototype.render = function() {
  $.each(imagesList['image-thumbnails'], function(i, image) {
    var renderedImage = new photoView(i + 1);
    renderedImage.el = $("<img>").attr("src", "images/thumbnails/" + image);
  });
}

$(document).ready(function() {
  var $clearHero = $('.hero').outerHeight();
  var $latestNews = $('.latest-news');
  var $window = $(window);
  var $nav = $('nav');

  $latestNews.hide();

  setTimeout(function() {
    $(".headline").fadeOut(3500);
    $latestNews.fadeIn(5000);
  }, 500);

  $window.scroll(function() {
    if ( $window.scrollTop() <= 0) {
      $nav.removeClass('fixed-top').next();
      $nav.addClass('fixed-bottom').next();
      // $latestNews.fadeIn(2000);      
    } else if ( ($window.scrollTop() - $clearHero) < 0 ) {
      $nav.removeClass('fixed-bottom').next();
      $nav.removeClass('fixed-top').next();
      // $latestNews.fadeOut(1000);
    } else {
      $nav.addClass('fixed-top').next();
    } 
  });
});