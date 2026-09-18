/**
 * ==========================================================================
 * MAIN.JS - Interaksi Portofolio Futry Nadeges
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-xmark');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. NAVBAR BLUR ON SCROLL & BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('py-3', 'shadow-lg', 'shadow-black/20', 'border-pink-900/30', 'bg-[#1c131a]/95');
      navbar.classList.remove('py-5', 'border-transparent', 'bg-[#1c131a]/70');
    } else {
      navbar.classList.add('py-5', 'border-transparent', 'bg-[#1c131a]/70');
      navbar.classList.remove('py-3', 'shadow-lg', 'shadow-black/20', 'border-pink-900/30', 'bg-[#1c131a]/95');
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --------------------------------------------------------------------------
  // 3. SCROLL REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 4. ACTIVE LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');

          desktopLinks.forEach(link => {
            link.classList.remove('text-pink-400', 'font-semibold', 'glow-text-pink');
            link.classList.add('text-slate-300');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('text-pink-400', 'font-semibold', 'glow-text-pink');
              link.classList.remove('text-slate-300');
            }
          });

          mobileLinks.forEach(link => {
            link.classList.remove('text-pink-400', 'bg-pink-950/30', 'border', 'border-pink-800/30');
            link.classList.add('text-slate-300');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('text-pink-400', 'bg-pink-950/30', 'border', 'border-pink-800/30');
              link.classList.remove('text-slate-300');
            }
          });
        }
      });
    }, { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 5. COPY TO CLIPBOARD TOAST
  // --------------------------------------------------------------------------
  window.copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToastMessage());
    } else {
      const temp = document.createElement('input');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToastMessage();
    }
  };

  function showToastMessage() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle text-pink-400"></i><span>Email berhasil disalin!</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // 6. IMAGE MODAL / LIGHTBOX (Preview Sertifikat)
  // --------------------------------------------------------------------------
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const certTriggers = document.querySelectorAll('.cert-trigger');

  if (modal && modalImg && certTriggers.length > 0) {

    // Buka Modal
    const openModal = (src) => {
      modalImg.src = src;
      modal.classList.remove('hidden');
      void modal.offsetWidth; // Reflow for CSS animation

      modal.classList.remove('opacity-0');
      modalImg.classList.remove('scale-95');
      modalImg.classList.add('scale-100');
      document.body.style.overflow = 'hidden';
    };

    // Tutup Modal
    const closeModal = () => {
      modal.classList.add('opacity-0');
      modalImg.classList.remove('scale-100');
      modalImg.classList.add('scale-95');
      document.body.style.overflow = '';

      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    };

    certTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => openModal(trigger.src));
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});