const loadedImages = [];

/* const background_image_array = [
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/left-1.jpg',
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/right-1.jpg',
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/left-2.jpg',
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/right-2.jpg',
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/left-3.jpg',
  'https://prabhasmediabucket.s3.ap-south-1.amazonaws.com/right-3.jpg',
]; */

const background_image_array_desktop = [
  './images/desktop-1.jpg',
  './images/desktop-2.jpg',
  './images/desktop-3.jpg',
  './images/desktop-4.jpg',
  './images/desktop-5.jpg',
  './images/desktop-6.jpg',
  './images/desktop-7.jpg',
];

const background_image_array_mobile = [
  './images/mobile-1.jpg',
  './images/mobile-2.jpg',
  './images/mobile-3.jpg',
  './images/mobile-4.jpg',
  './images/mobile-5.jpg',
  './images/mobile-6.jpg',
  './images/mobile-7.jpg',
];

const total_images = background_image_array_desktop.length;

const isMobile = innerWidth <= 800;

function chooseNextIndex(currentIndex, maxIndex) {
  return currentIndex === maxIndex - 1 ? 0 : currentIndex + 1;
}

function preloadImages(imageUrls, callback) {
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
  const image_1 = document.querySelector('img.header-image-1');
  const image_2 = document.querySelector('img.header-image-2');

  let image_index = 0;

  function setInitial() {
    image_1.src = isMobile
      ? `${background_image_array_mobile[image_index]}`
      : `${background_image_array_desktop[image_index]}`;
    image_1.style.opacity = 1;
    image_2.src = isMobile
      ? `${background_image_array_mobile[image_index + 1]}`
      : `${background_image_array_desktop[image_index + 1]}`;
    image_2.style.opacity = 1;
  }

  setInitial();

  //call this function after preloading all the images
  function changeImage() {
    image_index = chooseNextIndex(image_index, total_images);
    let image_name = isMobile
      ? `${background_image_array_mobile[image_index]}`
      : `${background_image_array_desktop[image_index]}`;
    image_1.style.opacity = 0;
    setTimeout(() => {
      image_1.src = image_name;
      setTimeout(() => {
        image_1.style.opacity = 1;
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

  preloadImages(
    isMobile ? background_image_array_mobile : background_image_array_desktop,
    () => {
      console.log('images have been preloaded');
      // Play the video and increase it's opacity
      setTimeout(() => {
        video.style.opacity = 1;
        video.play();
      }, 3600);

      setInterval(() => {
        animateSecondaryHeading(3600);
        changeImage();
      }, 7200);
    }
  );
});
