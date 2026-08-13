const billingSwitch = document.getElementById("billingSwitch");

const monthlyText = document.querySelector(".monthly-text");
const annualText = document.querySelector(".annual-text");

const priceCards = document.querySelectorAll(".price-card");

billingSwitch.addEventListener("change", function () {
  priceCards.forEach((card) => {
    const amount = card.querySelector(".amount");
    const period = card.querySelector(".mon");

    if (this.checked) {
      amount.textContent = card.dataset.annual;
      period.textContent = "/mo";
    } else {
      amount.textContent = card.dataset.monthly;
      period.textContent = "/mo";
    }
  });

  if (this.checked) {
    monthlyText.style.fontWeight = "500";
    annualText.style.fontWeight = "700";
  } else {
    monthlyText.style.fontWeight = "700";
    annualText.style.fontWeight = "500";
  }
});

const zoomInBtn = document.querySelector(".zoom-in");
const zoomOutBtn = document.querySelector(".zoom-out");

let carouselZoom = 1;

const carouselStage = document.querySelector(".carousel-stage");

zoomInBtn.addEventListener("click", () => {
  carouselZoom += 0.1;

  if (carouselZoom > 1.5) {
    carouselZoom = 1.5;
  }

  carouselStage.style.transform = `scale(${carouselZoom})`;
});

zoomOutBtn.addEventListener("click", () => {
  carouselZoom -= 0.1;

  if (carouselZoom < 0.7) {
    carouselZoom = 0.7;
  }

  carouselStage.style.transform = `scale(${carouselZoom})`;
});

/* ================================
   PHONE CAROUSEL
================================ */

const cards = document.querySelectorAll(".phone-card");
const dots = document.querySelectorAll(".dot");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 2;

/* ================================
   UPDATE CAROUSEL
================================ */

function updateCarousel() {
  const total = cards.length;

  cards.forEach((card, index) => {
    // Remove old position classes
    card.classList.remove("active", "left-1", "right-1", "left-2", "right-2");

    let difference = index - currentIndex;

    /*
            Make carousel circular
        */

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    /* Center */

    if (difference === 0) {
      card.classList.add("active");
    } else if (difference === -1) {
      /* One step left */
      card.classList.add("left-1");
    } else if (difference === 1) {
      /* One step right */
      card.classList.add("right-1");
    } else if (difference === -2) {
      /* Two steps left */
      card.classList.add("left-2");
    } else if (difference === 2) {
      /* Two steps right */
      card.classList.add("right-2");
    }
  });


  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}


function nextSlide() {
  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  updateCarousel();
}


function previousSlide() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  updateCarousel();
}

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;

    updateCarousel();
  });
});


cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    currentIndex = index;

    updateCarousel();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  }

  if (e.key === "ArrowLeft") {
    previousSlide();
  }
});

/* ================================
   TOUCH / SWIPE
================================ */

let touchStartX = 0;
let touchEndX = 0;

document
  .querySelector(".phone-carousel")
  .addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

document.querySelector(".phone-carousel").addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  handleSwipe();
});

function handleSwipe() {
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 50) {
    return;
  }

  if (distance < 0) {
    nextSlide();
  } else {
    previousSlide();
  }
}
