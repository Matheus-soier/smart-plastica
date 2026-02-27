const slides = Array.from(document.querySelectorAll(".slide"));
const slideIndex = document.getElementById("slideIndex");
const slideCounter = document.getElementById("slideCounter");
const progressFill = document.getElementById("progressFill");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const fullscreenButton = document.getElementById("fullscreenButton");
const stage = document.getElementById("stage");

let currentSlideIndex = 0;
let touchStartX = 0;
let touchStartY = 0;

function parseSlideFromHash() {
  const match = window.location.hash.match(/slide-(\d+)/i);
  if (!match) return 0;

  const parsed = Number.parseInt(match[1], 10) - 1;
  if (Number.isNaN(parsed)) return 0;

  return Math.max(0, Math.min(parsed, slides.length - 1));
}

function buildIndex() {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "index-item";
    button.dataset.slide = String(index);
    button.innerHTML = `
      <span class="index-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="index-title">${slide.dataset.title || `Slide ${index + 1}`}</span>
    `;

    button.addEventListener("click", () => {
      setSlide(index);
    });

    item.appendChild(button);
    fragment.appendChild(item);
  });

  slideIndex.innerHTML = "";
  slideIndex.appendChild(fragment);
}

function updateIndexState() {
  const buttons = slideIndex.querySelectorAll(".index-item");
  buttons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentSlideIndex);
  });
}

function setSlide(nextIndex, options = {}) {
  const safeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
  currentSlideIndex = safeIndex;

  slides.forEach((slide, index) => {
    const isActive = index === safeIndex;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    if (isActive) slide.scrollTop = 0;
  });

  slideCounter.textContent = `${safeIndex + 1} / ${slides.length}`;
  progressFill.style.width = `${((safeIndex + 1) / slides.length) * 100}%`;
  prevButton.disabled = safeIndex === 0;
  nextButton.disabled = safeIndex === slides.length - 1;
  updateIndexState();

  if (!options.skipHash) {
    history.replaceState(null, "", `#slide-${safeIndex + 1}`);
  }

  if (window.innerWidth <= 1080) {
    sidebar.classList.remove("open");
  }
}

function nextSlide() {
  setSlide(currentSlideIndex + 1);
}

function previousSlide() {
  setSlide(currentSlideIndex - 1);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    return;
  }
  document.exitFullscreen?.();
}

function handleKeyboard(event) {
  const activeTag = document.activeElement?.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    previousSlide();
  }

  if (event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleFullscreen();
  }
}

function handleSwipeStart(event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleSwipeEnd(event) {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) < 55 || Math.abs(deltaY) > 60) return;
  if (deltaX < 0) nextSlide();
  if (deltaX > 0) previousSlide();
}

function closeSidebarOutsideClick(event) {
  if (window.innerWidth > 1080) return;
  if (!sidebar.classList.contains("open")) return;

  const clickedInsideSidebar = sidebar.contains(event.target);
  const clickedToggle = toggleSidebar.contains(event.target);
  if (!clickedInsideSidebar && !clickedToggle) {
    sidebar.classList.remove("open");
  }
}

function syncFullscreenButton() {
  fullscreenButton.textContent = document.fullscreenElement ? "Sair tela cheia" : "Tela cheia";
}

buildIndex();
setSlide(parseSlideFromHash(), { skipHash: true });

prevButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);
toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
fullscreenButton.addEventListener("click", toggleFullscreen);

document.addEventListener("keydown", handleKeyboard);
document.addEventListener("click", closeSidebarOutsideClick);
document.addEventListener("fullscreenchange", syncFullscreenButton);

window.addEventListener("hashchange", () => {
  setSlide(parseSlideFromHash(), { skipHash: true });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    sidebar.classList.remove("open");
  }
});

stage.addEventListener("touchstart", handleSwipeStart, { passive: true });
stage.addEventListener("touchend", handleSwipeEnd, { passive: true });
