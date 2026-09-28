const productRail = document.querySelector('.featured-rail');

if (productRail) {
  const arrows = [...document.querySelectorAll('.featured-arrow')];
  const card = productRail.querySelector('.featured-card');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const updateArrows = () => {
    const remaining = productRail.scrollWidth - productRail.clientWidth;
    arrows.forEach((arrow) => {
      arrow.disabled = Number(arrow.dataset.direction) < 0
        ? productRail.scrollLeft <= 2
        : productRail.scrollLeft >= remaining - 2;
    });
  };

  arrows.forEach((arrow) => arrow.addEventListener('click', () => {
    const gap = parseFloat(getComputedStyle(productRail.querySelector('.featured-track')).gap) || 0;
    const step = (card?.getBoundingClientRect().width || productRail.clientWidth) + gap;
    productRail.scrollBy({left: step * Number(arrow.dataset.direction), behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  }));

  productRail.addEventListener('wheel', (event) => {
    if (window.innerWidth <= 800 || event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const atStart = productRail.scrollLeft <= 1;
    const atEnd = productRail.scrollLeft >= productRail.scrollWidth - productRail.clientWidth - 1;
    if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;
    event.preventDefault();
    productRail.scrollLeft += event.deltaY;
  }, {passive: false});

  productRail.addEventListener('scroll', updateArrows, {passive: true});
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

const categoryLinks = [...document.querySelectorAll('.catalogue-nav a[href^="#"]')];
if (categoryLinks.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      categoryLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
    });
  }, {rootMargin: '-25% 0px -65% 0px'});
  categoryLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}

const certificateGallery = document.querySelector('[data-certificate-gallery]');
const certificateLightbox = document.querySelector('.certificate-lightbox');

if (certificateGallery && certificateLightbox) {
  const lightboxImage = certificateLightbox.querySelector('img');
  const closeLightbox = certificateLightbox.querySelector('.certificate-lightbox-close');

  certificateGallery.addEventListener('click', (event) => {
    const trigger = event.target.closest('button[data-certificate]');
    if (!trigger) return;
    const image = trigger.querySelector('img');
    if (!image?.src) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    certificateLightbox.showModal();
  });

  closeLightbox.addEventListener('click', () => certificateLightbox.close());
  certificateLightbox.addEventListener('click', (event) => {
    if (event.target === certificateLightbox) certificateLightbox.close();
  });
}
