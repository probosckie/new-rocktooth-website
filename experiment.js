function chooseNextIndex(currentIndex, maxIndex) {
  return currentIndex === maxIndex - 1 ? 0 : currentIndex + 1;
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

  // Play the video and increase it's opacity
  setTimeout(() => {
    video.style.opacity = 1;
    video.play();
  }, 3000);

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
  //do it when changing image... not randomly.
  setInterval(() => {
    animateSecondaryHeading(3500);
    changeImage();
  }, 6000);
});
