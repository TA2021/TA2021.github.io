

var carousel = document.querySelector('.carousel');
var cellCount = 9;
var selectedIndex = 0;

function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-588px) rotateY(' + angle + 'deg)';
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

let isDragging = false;
let initialX;


carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  initialX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - initialX;
  const rotation = (deltaX / carousel.clientWidth) * 360;

  carousel.style.transform = `rotateY(${rotation}deg)`;
});

carousel.addEventListener('touchend', () => {
  isDragging = false;
});