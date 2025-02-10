// Scratch Card Logic
const canvas = document.getElementById("scratchCanvas");
const hiddenContent = document.getElementById("hiddenContent");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let percentScratched = 0;

// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fill canvas with gray overlay
ctx.fillStyle = "#cccccc";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Event listeners for scratching
canvas.addEventListener("mousedown", startScratching);
canvas.addEventListener("mousemove", scratch);
canvas.addEventListener("mouseup", stopScratching);
canvas.addEventListener("touchstart", startScratching);
canvas.addEventListener("touchmove", scratch);
canvas.addEventListener("touchend", stopScratching);

function startScratching(e) {
  isDrawing = true;
}

function scratch(e) {
  if (!isDrawing) return;

  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2, false);
  ctx.fill();

  // Calculate the scratched area
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const totalPixels = imageData.length / 4;
  let transparentPixels = 0;

  for (let i = 3; i < imageData.length; i += 4) {
    if (imageData[i] === 0) transparentPixels++;
  }

  percentScratched = (transparentPixels / totalPixels) * 100;

  if (percentScratched > 50) {
    canvas.style.display = "none";
    hiddenContent.style.display = "block";
  }
}

function stopScratching() {
  isDrawing = false;
}

// Offer Tracking Logic
let completedOffers = 0;
const requiredOffers = 2; // Number of offers required
const offerLinks = document.querySelectorAll(".offer-link");
const completeMessage = document.getElementById("completeMessage");
const redirectButton = document.getElementById("redirectButton");

// Track clicks on offer links
offerLinks.forEach(link => {
  link.addEventListener("click", () => {
    completedOffers++;
    if (completedOffers >= requiredOffers) {
      completeMessage.style.display = "block";
    }
  });
});

// Redirect after completing offers
redirectButton.addEventListener("click", () => {
  window.location.href = "https://www.totaltr4ffic.com/41LGZKT/2KPD99NK/"; // Zara €500 redirect URL
});