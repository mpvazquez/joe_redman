var arrowRight =  $("#arrow-right");
var arrowLeft = document.getElementById("arrow-left");

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

  $(".left-position").on("click", function() {
    newPhotosCollection.moveBackward();
  });

  $(".right-position").on("click", function() {
    newPhotosCollection.moveForward();
  });
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
    $(this.models[this.photosCount() - 2].el).removeClass()
      .addClass("back-position");
    this.startPosition = 0;
  } else {  
    $(this.models[this.prevPhotoPosition()].el).removeClass()
      .addClass("back-position");
    this.startPosition++;
  }
  this.renderCarousel();
  return this;
}
// lets user select previous photo oin collection
PhotosCollection.prototype.moveBackward = function() {
  if(this.startPosition === 0) {
    $(this.models[this.nextPhotoPosition()].el).removeClass()
      .addClass("back-position");
    this.startPosition = this.photosCount() - 1;
  } else {  
    $(this.models[this.nextPhotoPosition()].el).removeClass()
      .addClass("back-position");
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
  var $nav = $('nav');
  var $window = $(window);
  var $latestNews = $('.latest-news');
  var $clearViewport = $window.outerHeight();
  console.log($clearViewport);
  console.log($nav.height());

  $latestNews.hide();
  $nav.addClass("fixed-bottom").next();

  setTimeout(function() {
    $(".headline").fadeOut(3500);
    $latestNews.fadeIn(5000);
  }, 500);

  $window.scroll(function() {
    if ( $window.scrollTop() <= 0) {
      $nav.removeClass('fixed-top').next();
      $nav.addClass('fixed-bottom').next();
      // $latestNews.fadeIn(2000);    
    } else if ($window.scrollTop() < $clearViewport + $nav.height()) {
      $nav.removeClass().next();
      // $latestNews.fadeOut(1000);
    } else {
      $nav.addClass('fixed-top').next();
    } 
  });

  $.each(imagesList['image-thumbnails'], function(i, image) {
    new PhotosView(image).render();
  });

  newPhotosCollection.renderCarousel();

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      console.log(target)
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 60
        }, "slow");
        return false;
      }
    }
  });
});