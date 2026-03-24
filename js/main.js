(function(){

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  window.scrollY > 500
    ? navbar.classList.add("scrolled")
    : navbar.classList.remove("scrolled");
});

// AOS init
AOS.init();

//// Slick Card Carousel
$(document).ready(function () {
  $(".card-carousel").slick({
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    infinite: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  });
});

//// Counter animation
const counters = document.querySelectorAll(".counter");
const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let current = 0;
  const update = () => {
    const increment = target / 200;
    if (current < target) {
      current += increment;
      counter.innerText = Math.ceil(current);
      setTimeout(update, 10);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

//// WhatsApp Form
const whatsappForm = document.getElementById("whatsappForm");
if (whatsappForm) {
  whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const whatsappNumber = "905373795952";
    const text =
      "New Contact Message:%0A%0A" +
      "Name: " + name + "%0A" +
      "Email: " + email + "%0A" +
      "Phone: " + phone + "%0A" +
      "Message: " + message;

    const url = "https://wa.me/" + whatsappNumber + "?text=" + text;
    window.open(url, "_blank");
  });
}

//// Bootstrap Video + Image Carousel (المعدل)
document.addEventListener("DOMContentLoaded", function() {
  const carouselEl = document.getElementById('carouselExampleCaptions');
  const video = document.getElementById('heroVideo');

  if (!carouselEl) return;

  const carousel = new bootstrap.Carousel(carouselEl, {
    interval: false, // وقف التبديل التلقائي بالبداية
    ride: false,
    pause: false,
    wrap: true
  });

  // لما يخلص الفيديو → روح للسلايد اللي بعده
  if (video) {
    video.addEventListener("ended", function () {
      carousel.next();

      // بعد الفيديو شغّل الحركة التلقائية للصور
      carousel._config.interval = 3000;
      carousel.cycle();
    });
  }
});

})();