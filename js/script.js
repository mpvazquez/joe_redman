// photos view constructor function and renders on the page
var PhotosView = function(imageName){
  this.imageName = imageName;
  this.el = $("<li>");
}
PhotosView.prototype.render = function(){
  $("<img>").attr("src", "images/thumbnails/" + this.imageName)
    .appendTo(this.el);
  $('#photo-carousel').append(this.el);
}

$(document).ready(function() {
  var $clearHero = $('.hero').outerHeight();
  var $window = $(window);
  var $nav = $('nav');
  var $latestNews = $('.latest-news');

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

  $.each(imagesList['image-thumbnails'], function(i, image) {
    var newView = new PhotosView(image);
    newView.render();
  });
});