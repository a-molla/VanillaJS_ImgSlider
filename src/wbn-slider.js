document.addEventListener("DOMContentLoaded", () => {
  // Consts
  const SLIDE_TIME = 500; //ms

  // Buttons
  const backBtn = document.querySelector(".wbn-slider-back-btn");
  const fwdBtn = document.querySelector(".wbn-slider-next-btn");

  // Slides
  const allSlides = [...document.querySelectorAll(".wbn-slide")];

  // Vars
  let clickable = true;
  let active = null;
  let newActive = null;

  function initSlider() {
    allSlides.forEach(slide => {
      slide.setAttribute(
        "style",
        `transition: transform ${SLIDE_TIME}ms ease;
                animation-duration: ${SLIDE_TIME}ms`
      );
    });

    allSlides.forEach(slide => {
      slide.addEventListener("transitionend", e => {
        if (slide === active && !clickable) {
          clickable = true;
          active.className = "wbn-slide";
        }
      });
    });
  }

  function changeSlide(forward) {
    if (!clickable) {
      return;
    }

    clickable = false;
    active = document.querySelector(".active");
    const activeSlideIndex = allSlides.indexOf(active);

    if (forward) {
      newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
      active.classList.add("slideOutLeft");
      newActive.classList.add("slideInRight", "active");
    } else {
      newActive =
        allSlides[(activeSlideIndex - 1 + allSlides.length) % allSlides.length];
      active.classList.add("slideOutRight");
      newActive.classList.add("slideInLeft", "active");
    }
  }

  backBtn.addEventListener("click", () => {
    changeSlide(true);
  });

  fwdBtn.addEventListener("click", () => {
    changeSlide(false);
  });

  initSlider();
});
