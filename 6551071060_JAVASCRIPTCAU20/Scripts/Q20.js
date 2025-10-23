const slides = document.getElementById("slides");
const totalSlides = document.querySelectorAll(".slide").length;
let index = 0;

function showSlide() {
  slides.style.transform = `translateX(-${index * 200}px)`;
}

document.querySelector(".arrow.right").addEventListener("click", () => {
  index++;
  if (index > totalSlides - 5) index = totalSlides - 5;
  showSlide();
});

document.querySelector(".arrow.left").addEventListener("click", () => {
  index--;
  if (index < 0) index = 0;
  showSlide();
});

setInterval(() => {
  index++;
  if (index > totalSlides - 5) index = 0;
  showSlide();
}, 3000);
