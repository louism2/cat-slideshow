// next, prev, animate
// animate -- cycles the images
// prev or next will stop the cyle

$(document).ready(function(){

  var animate_timeout = null;
  var $images = null;
  var $canvas = $('#slide-show-canvas');
  var $next_button = $('#next-button');
  var $previous_button = $('#prev-button');
  var $animate_button = $('#animate-button');

  $.ajax('/data.json').done(function(data){
    // Loop through each url returned and append
    // it inside of #slide-show-canvas div
    for(var x=0; x <= data.length-1; x++){
      $canvas.append('<img src="'+data[x]+'">');
    }
    $images = $canvas.children('img');
    $images.first().addClass('active-image');
  }).fail(function(){
    // Do something to handle the failed request
  });

  $previous_button.on('click', function(){
    clearTimeout(animate_timeout);
    displayPreviousImage();
  })

  $next_button.on('click', function(){
    clearTimeout(animate_timeout);
    displayNextImage();
  })

  $animate_button.on('click', function(){
    animateImages();
  });

  function animateImages(){
    displayNextImage();
    animate_timeout = setTimeout(function(){ animateImages();}, 3000);
  }

  function displayNextImage(){
    var $currently_visible_image = $images.filter('.active-image')
    if($currently_visible_image.next().length > 0){
      var $next_image = $currently_visible_image.next();
    }else{
      var $next_image = $images.first();
    }

    swapImages($currently_visible_image, $next_image);
  }

  function displayPreviousImage(){
    var $currently_visible_image = $images.filter('.active-image');
    if($currently_visible_image.prev().length > 0){
      var $next_image = $currently_visible_image.prev();
    }else{
      var $next_image = $images.last();
    }

    swapImages($currently_visible_image, $next_image);
  }

  // Fades out the current image and fades in the next image
  function swapImages($image_to_hide, $image_to_show){
    $image_to_hide.animate({opacity: 0}, 600, function(){
      $image_to_hide.removeClass('active-image');
      $image_to_show.css({opacity: 0});
      $image_to_show.addClass('active-image');
      $image_to_show.animate({opacity: 1.00}, 600)
    })
  }

})




