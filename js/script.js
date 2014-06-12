$(document).ready(function() {
  $(".latest-news").hide(); 
  setTimeout(function() {
    $(".headline").fadeOut(3500);
    $(".latest-news").fadeIn(5000);
  }, 500);
});