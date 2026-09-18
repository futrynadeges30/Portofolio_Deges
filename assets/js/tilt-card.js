/**
 * ==========================================================================
 * TILT-CARD.JS - 3D Tilt Effect (Revisi: Super Smooth, Elegan, Anti-Jitter)
 * Portfolio: Futry Nadeges
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const tiltWrappers = document.querySelectorAll('.tilt-card-wrapper');

  // Deteksi perangkat: Jika layar sentuh (HP), matikan efek hover agar mudah diklik
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  tiltWrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.tilt-card');
    if (!card) return;

    // Tambahkan pantulan cahaya
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Batas kemiringan 4 derajat (Sangat elegan dan tombol tidak kabur)
      const maxRotate = 4;

      const rotateX = ((y - centerY) / centerY) * -maxRotate;
      const rotateY = ((x - centerX) / centerX) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.opacity = '0';
    });
  });
});