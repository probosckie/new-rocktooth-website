function chooseNextIndex(currentIndex, maxIndex) {
  return currentIndex === maxIndex - 1 ? 0 : currentIndex + 1;
}

function preloadImages(imageUrls, callback) {
  const loadedImages = [];
  let imagesToLoad = imageUrls.length;

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;

    // Image load event
    img.onload = function () {
      loadedImages.push(img);
      if (--imagesToLoad === 0) {
        // All images have been loaded
        callback(loadedImages);
      }
    };

    // Image error event (in case the image fails to load)
    img.onerror = function () {
      console.log('image load error', url);
      if (--imagesToLoad === 0) {
        // All images have been loaded, even if some failed
        callback(loadedImages);
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const video = document.querySelector('#bandvideo');
  const heading_long = document.querySelector('header h2 span');
  const animation_class_long = 'sliding-from-left-slow';
  const transition_mask = document.querySelector('.transition-mask');
  const image_changing_div = document.querySelector('.image-1');
  const background_image_array = [
    './images/left-1.jpg',
    './images/right-1.jpg',
    './images/left-2.jpg',
    './images/right-2.jpg',
    './images/left-3.jpg',
    './images/right-3.jpg',
  ];
  let image_index = 0;

  //call this function after preloading all the images
  function changeImage() {
    image_index = chooseNextIndex(image_index, background_image_array.length);
    let image_name = background_image_array[image_index];
    transition_mask.style.opacity = 1;
    setTimeout(() => {
      image_changing_div.style.backgroundImage = `url('${image_name}')`;
      setTimeout(() => {
        transition_mask.style.opacity = 0;
      }, 100);
    }, 900);
  }

  function animateSecondaryHeading(initialTimeout) {
    setTimeout(() => {
      heading_long.classList.remove(animation_class_long);
      setTimeout(() => {
        heading_long.classList.add(animation_class_long);
      }, 500);
    }, initialTimeout);
  }

  animateSecondaryHeading(4500);

  preloadImages(background_image_array, () => {
    console.log('images have been preloaded');
    // Play the video and increase it's opacity
    setTimeout(() => {
      video.style.opacity = 1;
      video.play();
    }, 4500);

    //do it when changing image... not randomly.
    setInterval(() => {
      animateSecondaryHeading(3600);
      changeImage();
    }, 7200);
  });
});
