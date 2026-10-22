// Phone strip: the arrow buttons scroll two screens at a time.
const strip = document.getElementById("strip");

const scrollStrip = (direction) => {
  if (!strip) return;
  const card = strip.querySelector(".phone-card");
  const gap = 24; // the same gap as .strip in styles.css
  const step = card ? card.getBoundingClientRect().width + gap : 264;
  strip.scrollBy({ left: direction * step * 2, behavior: "smooth" });
};

document.getElementById("strip-prev")?.addEventListener("click", () => scrollStrip(-1));
document.getElementById("strip-next")?.addEventListener("click", () => scrollStrip(1));
