let sldierContainer = document.getElementById('sliderContainer');
let slider = document.getElementById('slider');
let cards = slider.getElementsByTagName('li');

let sliderContainerWidth = sldierContainer.clientWidth;
let elementsToShow = 3;

let cardWidth = sliderContainerWidth/elementsToShow;

slider.style.width = cards.length*cardWidth+'px';

for(let index = 0 ; index < cards.length ; index++) {
   const element = cards[index];
   element.style.width = cardWidth+'px';
}


