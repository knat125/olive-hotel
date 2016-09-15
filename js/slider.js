var slider = document.querySelectorAll('#slider .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 3500);
var sliderHeight = document.querySelectorAll('#slider .slide img')[0].offsetHeight;
document.getElementById('slider').style.height = sliderHeight + 'px';

window.onresize = function() {
	var newSliderHeight = document.querySelectorAll('#slider .slide img')[0].offsetHeight;
	document.getElementById('slider').style.height = newSliderHeight + 'px';
}

function nextSlide() {
	slider[currentSlide].className = 'slide';
	currentSlide = (currentSlide+1)%slider.length;
	slider[currentSlide].className = 'slide shown';
}