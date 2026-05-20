// draggeble hero carsoule with transperant slider buttons
let currentSlide = 0;
const totalSlides = 3;
let autoSlideTimer;

// draging carsoule effect
let dragStartX = 0,
  dragEndX = 0,
  isDragging = false;
const slidesContainer = document.getElementById("heroSlides");

function goToSlide(index) {
  document.getElementById("slide-" + currentSlide).classList.remove("active");
  document
    .querySelectorAll(".hero-dot")
    [currentSlide].classList.remove("active");
  currentSlide = (index + totalSlides) % totalSlides;
  document.getElementById("slide-" + currentSlide).classList.add("active");
  document.querySelectorAll(".hero-dot")[currentSlide].classList.add("active");
  slidesContainer.style.transform = "translateX(-" + currentSlide * 100 + "%)";
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}
function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

document.getElementById("heroNext").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});
document.getElementById("heroPrev").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});
document.querySelectorAll(".hero-dot").forEach((dot) =>
  dot.addEventListener("click", function () {
    goToSlide(parseInt(this.dataset.index));
    resetAutoSlide();
  }),
);

// Mouse drag events for carousel (draggable)
slidesContainer.addEventListener("mousedown", (e) => {
  dragStartX = e.clientX;
  isDragging = true;
  slidesContainer.style.cursor = "grabbing";
  e.preventDefault();
});
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  dragEndX = e.clientX;
});
window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  slidesContainer.style.cursor = "grab";
  if (dragEndX && Math.abs(dragEndX - dragStartX) > 50) {
    dragEndX < dragStartX ? nextSlide() : prevSlide();
    resetAutoSlide();
  }
  dragStartX = 0;
  dragEndX = 0;
});

startAutoSlide();

// Intersection Observer for reveal
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 50);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => io.observe(el));

// Filters (just for UI fun)
document.querySelectorAll(".filter-btn").forEach((btn) =>
  btn.addEventListener("click", function () {
    this.closest(".filter-row")
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  }),
);

// Product modal (larger, easy close)
function openProduct(img, name, cat, price, old, desc, rating, stars) {
  document.getElementById("modalImg").src = img;
  document.getElementById("modalTitle").innerText = name;
  document.getElementById("modalCat").innerText = cat;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalOld").innerText = old || "";
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalStars").innerHTML =
    stars + ` <span style="font-size:11px; color:#888;">(${rating} avg)</span>`;
  document.getElementById("modal").classList.add("open");
}
function closeModal(e) {
  if (e.target === document.getElementById("modal"))
    document.getElementById("modal").classList.remove("open");
}

// Size active toggle (human style)
document.querySelectorAll(".size-opt").forEach((btn) =>
  btn.addEventListener("click", function () {
    this.closest(".sizes")
      .querySelectorAll(".size-opt")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  }),
);

// Add to cart simulation
document.querySelectorAll(".modal-add-btn").forEach((btn) =>
  btn.addEventListener("click", function () {
    var originalText = this.innerHTML; // using var on purpose
    this.innerHTML = '<i class="bi bi-check2"></i> Added!';
    this.style.background = "#6b8f71";
    setTimeout(() => {
      this.innerHTML = originalText;
      this.style.background = "";
    }, 2000);
    console.log("Added to cart");
  }),
);

// Back to top
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) backTop.classList.add("show");
  else backTop.classList.remove("show");
});
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Countdown timer (set 10 days + 14hrs)
let endTime = new Date(Date.now() + 10 * 86400000 + 14 * 3600000 + 30 * 60000);
function updateTimer() {
  let diff = endTime - Date.now();
  if (diff <= 0) return;
  let days = Math.floor(diff / 86400000);
  let hrs = Math.floor((diff % 86400000) / 3600000);
  let mins = Math.floor((diff % 3600000) / 60000);
  let secs = Math.floor((diff % 60000) / 1000);
  document.getElementById("timerDays").innerText = String(days).padStart(
    2,
    "0",
  );
  document.getElementById("timerHrs").innerText = String(hrs).padStart(2, "0");
  document.getElementById("timerMin").innerText = String(mins).padStart(2, "0");
  document.getElementById("timerSec").innerText = String(secs).padStart(2, "0");
}
setInterval(updateTimer, 1000);
updateTimer();

// Newsletter simple validation
document.getElementById("newsletterBtn").addEventListener("click", function () {
  let email = document.getElementById("newsletterEmail").value;
  if (email.includes("@") && email.includes(".")) {
    alert("Thanks for joining!");
    console.log("Newsletter signup:", email);
  } else {
    alert("Please enter a valid email address.");
  }
});

//  fix for mobile burger (just a placeholder)
document
  .getElementById("burger")
  ?.addEventListener("click", () =>
    alert("Mobile menu coming soon check back!"),
  );
