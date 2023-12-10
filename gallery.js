document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.names-of-bands-carousel');
  const text = document.querySelector('.scrolling-text');

  //let appearedOnce = false;

  /* const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('appearing');
        appearedOnce = true;
      } else if (appearedOnce) {
        console.log('disappearing after appearing');
      }
    });
  });

  observer.observe(targetLastElement); */

  // Check if text width exceeds container width
  if (text.offsetWidth > container.offsetWidth) {
    // Adjust animation keyframes dynamically
    const keyframes = `@keyframes scroll-text {
        0% {
          transform: translateX(${text.offsetWidth}px);
        }
        50% {
          transform: translateX(-${text.offsetWidth / 2}px); 
        }
        100% {
          transform: translateX(-${text.offsetWidth * 2}px); 
        }
      }`;

    // Apply updated keyframes
    const styleSheet = document.styleSheets[0];
    //console.log('stylesheet css rules', styleSheet.cssRules);
    // see if this works when this stuff is hosted on github - without it also it's working fine
    //styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }
});
