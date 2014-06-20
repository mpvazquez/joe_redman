/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// photos view constructor function and prototype renders them
var PhotosView = function(imageName, imageDescription){
  this.imageName = imageName;
  this.description = $("<p>").html(imageDescription);
  this.el = $("<li>").addClass("back-position");
}
PhotosView.prototype.render = function(){
  $("<img>").attr("src", "images/thumbnails/" + this.imageName)
    .appendTo(this.el);
  this.el.append(this.description);
  
  $('#photo-carousel').append(this.el);
  newPhotosCollection.models.push(this);
  return this;
}



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// collection of photos, image element models to render
// as an image carousel that can expand/shrink
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
  this.addEventHandlers();
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
  } else {
    return this.startPosition + 1;
  }
}
// returns value of previous photo in collection
PhotosCollection.prototype.prevPhotoPosition = function() {
  if(this.startPosition === 0) {
    return this.photosCount() - 1;
  } else {
    return this.startPosition - 1;
  }
}
// lets user select next photo in collection 
PhotosCollection.prototype.moveForward = function() {
  //removes event handlers that were attached in current position
  this.removeEventHandlers();

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
  this.removeEventHandlers();

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
// adds event listeners so user can move carousel forward
PhotosCollection.prototype.addEventHandlers = function() {
  $(".left-position").on("click", function() {
    newPhotosCollection.moveBackward();
  });
  $(".right-position").on("click", function() {
    newPhotosCollection.moveForward();
  });
}
// removes event handlers -- called after an event is evoked
PhotosCollection.prototype.removeEventHandlers = function() {
  $(".left-position").off("click");
  $(".right-position").off("click");
}
PhotosCollection.prototype.setPermanentHandlers = function() {
  $("#arrow-left").on("click", function() {
    newPhotosCollection.moveBackward();
  });
  $("#arrow-right").on("click", function() {
    newPhotosCollection.moveForward();
  });

  $("body").on("keydown", function(event) {
    if(event.keyCode === 39) {
      newPhotosCollection.moveForward();
    } else if (event.keyCode === 37) {
      newPhotosCollection.moveBackward();
    }
  });
}
// new photo collection / start carousel
var newPhotosCollection = new PhotosCollection();



/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// script below this function will run once the DOM loads
$(document).ready(function() {
  var $nav = $('nav');
  var $window = $(window);
  var $scrolled = $window.scrollTop();
  var $latestNews = $('.latest-news');
  var $clearViewport = $window.outerHeight();

  $latestNews.hide();
  $(".credits").hide();
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
    } else if ($window.scrollTop() < $clearViewport) {
      $nav.removeClass().next();
      // $latestNews.fadeOut(1000);
    } else {
      $nav.addClass('fixed-top').next();
    }
  });

  $.each(imagesList['image-thumbnails'], function(i, image) {
    var description = imagesList['image-descriptions'][i];
    new PhotosView(image, description).render();
  });

  newPhotosCollection.renderCarousel().setPermanentHandlers();

  $("#credits a").on("click", function() {
    if($(".credits").css("display") === "block") {
      $(".credits").hide();
    } else {
      $(".credits").css("display", "block");
    }
  })

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, "slow");
        return false;
      }
    }
  });
});