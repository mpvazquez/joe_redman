// collection of photos and image models
var PhotosCollection = function(){
  this.models = [];
  this.startPosition = 1;
}
// renders photo collection carousel on page
PhotosCollection.prototype.renderCarousel = function() {
  for(var i = 0; i < this.photosCount(); i++) {
    if(i === this.prevPhotoPosition()) {
      $(this.models[i].el).removeClass()
      .addClass("left-position");
    } else if (i === this.startPosition) {
      $(this.models[i].el).removeClass()
      .addClass("center-position");
    } else if (i === this.nextPhotoPosition()) {
      $(this.models[i].el).removeClass()
      .addClass("right-position");
    }
  }
  return this;
}
// returns total count of photo models in collection
PhotosCollection.prototype.photosCount = function() {
  return this.models.length;
}
// returns value of next photo in collection
PhotosCollection.prototype.nextPhotoPosition = function() {
  if(this.startPosition === this.photosCount() - 1) {
    return 0;
  }
  return this.startPosition + 1;
}
// returns value of previos photo in collection
PhotosCollection.prototype.prevPhotoPosition = function() {
  if(this.startPosition === 0) {
    return this.photosCount() - 1;
  }
  return this.startPosition - 1;
}
// lets user select next photo in collection
PhotosCollection.prototype.moveForward = function() {
  if(this.photosCount() - 1 === this.startPosition) {
    $(this.models[this.photosCount() - 2].el)
      .addClass("back-position");
    this.startPosition = 0;
  } else {  
    $(this.models[this.prevPhotoPosition()].el)
      .addClass("back-position");
    this.startPosition++;
  }
  this.renderCarousel();
  return this;
}
// lets user select previous photo oin collection
PhotosCollection.prototype.moveBackward = function() {
  if(this.startPosition === 0) {
    $(this.models[this.nextPhotoPosition()].el).addClass("back-position");
    this.startPosition = this.photosCount() - 1;
  } else {  
    $(this.models[this.nextPhotoPosition()].el).addClass("back-position");
    this.startPosition--;
  }
  this.renderCarousel();
  return this;
}

var newPhotosCollection = new PhotosCollection();

// photos view constructor function and prototype renders them
var PhotosView = function(imageName){
  this.imageName = imageName;
  this.el = $("<li>").addClass("back-position");
}
PhotosView.prototype.render = function(){
  $("<img>").attr("src", "images/thumbnails/" + this.imageName)
    .appendTo(this.el);
  $('#photo-carousel').append(this.el);
  newPhotosCollection.models.push(this);
  return this;
}

// script below this function will run once the DOM loads
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
    new PhotosView(image).render();
  });

  newPhotosCollection.renderCarousel();
});