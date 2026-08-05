/* ============================================================
   〜NOFY〜 命名刺繍ブランド — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBrushLoading();
  initHeader();
  initHeroSlider();
  initHamburger();
  initProductFilter();
  initGalleryFilter();
  initLightbox();
  initFAQ();
  initProductDetail();
  initContactForm();
  initScrollAnimations();
});

/* ============================================================
   BRUSH LOADING — 筆文字「夢」書き順アニメーション制御
   9フェーズのストロークを書き順に沿って順次 opacity 0→1 表示し、
   実際に筆で一画ずつ書いているように見せる
   ============================================================ */
function initBrushLoading() {
  const overlay = document.getElementById('brush-loading');
  if (!overlay) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.remove();
    return;
  }

  const phases = overlay.querySelectorAll('.stroke-phase');
  const brand = overlay.querySelector('.brush-loading-brand');
  const totalPhases = phases.length; // 9

  // Timing (ms)
  const INITIAL_DELAY = 400;   // 最初の一画を始めるまでの間
  const STROKE_INTERVAL = 320; // 各画の間隔 — 筆を運ぶテンポ
  const PAUSE_AFTER = 800;     // 全画完了後、余韻を残す
  const BRAND_DELAY = 600;     // ブランド名表示までの追加待ち

  // Phase ごとに順次表示
  phases.forEach((phase, i) => {
    setTimeout(() => {
      phase.classList.add('is-written');
    }, INITIAL_DELAY + i * STROKE_INTERVAL);
  });

  // 全フェーズ表示完了時刻
  const allWrittenAt = INITIAL_DELAY + (totalPhases - 1) * STROKE_INTERVAL + 350;

  // Show brand name after writing completes
  setTimeout(() => {
    if (brand) brand.classList.add('is-visible');
  }, allWrittenAt + PAUSE_AFTER);

  // Fade out overlay
  const totalTime = allWrittenAt + PAUSE_AFTER + BRAND_DELAY + 800;
  setTimeout(() => {
    overlay.classList.add('is-done');
    setTimeout(() => { overlay.remove(); }, 1100);
  }, totalTime);
}

/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scroll;
  }, { passive: true });
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length === 0) return;

  let current = 0;
  let interval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(parseInt(dot.dataset.slide));
      startAutoplay();
    });
  });

  startAutoplay();
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   PRODUCT FILTER
   ============================================================ */
function initProductFilter() {
  const buttons = document.querySelectorAll('.products-filter .filter-btn');
  const grid = document.getElementById('products-grid');
  if (buttons.length === 0 || !grid) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const cards = grid.querySelectorAll('.product-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   GALLERY FILTER
   ============================================================ */
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.gallery-filter .filter-btn');
  const grid = document.getElementById('gallery-grid');
  if (buttons.length === 0 || !grid) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const items = grid.querySelectorAll('.masonry-item');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  const galleryImgs = document.querySelectorAll('.gallery-img');
  let currentIndex = 0;
  const images = [];

  galleryImgs.forEach((img, i) => {
    images.push(img.dataset.full || img.src);
    img.parentElement.addEventListener('click', () => {
      currentIndex = i;
      showImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function showImage() {
    lightboxImg.src = images[currentIndex];
    lightboxImg.alt = `ギャラリー画像 ${currentIndex + 1}`;
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (questions.length === 0) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close all others
      questions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = '0';
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !expanded);
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });
}

/* ============================================================
   PRODUCT DETAIL INTERACTIONS
   ============================================================ */
function initProductDetail() {
  // Thumbnail gallery
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImg = document.getElementById('main-product-img');
  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.dataset.src;
      });
    });
  }

  // Plan price calculator
  const planInputs = document.querySelectorAll('input[name="plan"]');
  const totalPrice = document.getElementById('total-price');
  if (planInputs.length && totalPrice) {
    const prices = { basic: 7500, standard: 9000, full: 11000 };
    planInputs.forEach(input => {
      input.addEventListener('change', () => {
        const price = prices[input.value] || 7500;
        totalPrice.innerHTML = `&yen;${price.toLocaleString()}<span class="tax">（税込）</span>`;
      });
    });
  }

  // Fabric selector visual feedback
  const fabricOptions = document.querySelectorAll('.fabric-option');
  fabricOptions.forEach(option => {
    option.addEventListener('click', () => {
      const group = option.closest('.fabric-selector');
      group.querySelectorAll('.fabric-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const typeSelect = document.getElementById('contact-type');
  const orderFields = document.getElementById('order-fields');
  const hwFields = document.getElementById('hw-fields');
  const parentsFields = document.getElementById('parents-fields');

  if (!form) return;

  // Show/hide order fields based on type
  if (typeSelect && orderFields) {
    typeSelect.addEventListener('change', () => {
      orderFields.style.display = typeSelect.value === 'order' ? 'block' : 'none';
    });
  }

  // Show/hide height/weight and parents fields based on plan
  const planRadios = form.querySelectorAll('input[name="plan"]');
  planRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (hwFields) {
        hwFields.style.display = (radio.value === 'standard' || radio.value === 'full') ? 'grid' : 'none';
      }
      if (parentsFields) {
        parentsFields.style.display = radio.value === 'full' ? 'grid' : 'none';
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success) {
        alert('お問い合わせを受け付けました。\n内容を確認次第、ご連絡いたします。');
        form.reset();
        if (orderFields) orderFields.style.display = 'none';
      } else {
        alert('送信に失敗しました。お手数ですが、メールにてお問い合わせください。');
      }
    } catch (err) {
      alert('送信に失敗しました。お手数ですが、メールにてお問い合わせください。');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Auto-apply animation to sections
  document.querySelectorAll('.section > .container').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}
