/**
 * Lightbox Module
 * Handles fullscreen viewing of paintings with navigation
 */

const Lightbox = {
  paintings: [],
  currentIndex: 0,
  element: null,
  isOpen: false,

  /**
   * Initialize the lightbox
   * @param {Array} paintings - Array of painting objects
   */
  init(paintings) {
    this.paintings = paintings;
    this.createLightbox();
    this.attachEvents();
  },

  /**
   * Create lightbox DOM structure
   */
  createLightbox() {
    if (this.element) return;

    const lightbox = createElement('div', {
      id: 'lightbox',
      className: 'lightbox',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-hidden': 'true'
    });

    const overlay = createElement('div', { className: 'lightbox-overlay' });

    const content = createElement('div', { className: 'lightbox-content' });

    const closeBtn = createElement('button', {
      className: 'lightbox-close',
      'aria-label': 'Close lightbox'
    }, '×');

    const prevBtn = createElement('button', {
      className: 'lightbox-prev',
      'aria-label': 'Previous painting'
    }, '‹');

    const nextBtn = createElement('button', {
      className: 'lightbox-next',
      'aria-label': 'Next painting'
    }, '›');

    const imageContainer = createElement('div', { className: 'lightbox-image-container' });
    const img = createElement('img', {
      className: 'lightbox-image',
      alt: ''
    });

    imageContainer.appendChild(img);

    const infoContainer = createElement('div', { className: 'lightbox-info' });

    content.appendChild(closeBtn);
    content.appendChild(prevBtn);
    content.appendChild(nextBtn);
    content.appendChild(imageContainer);
    content.appendChild(infoContainer);

    lightbox.appendChild(overlay);
    lightbox.appendChild(content);

    document.body.appendChild(lightbox);

    this.element = lightbox;
  },

  /**
   * Attach event listeners
   */
  attachEvents() {
    if (!this.element) return;

    // Close button
    const closeBtn = this.element.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => this.close());

    // Overlay click to close
    const overlay = this.element.querySelector('.lightbox-overlay');
    overlay.addEventListener('click', () => this.close());

    // Navigation buttons
    const prevBtn = this.element.querySelector('.lightbox-prev');
    const nextBtn = this.element.querySelector('.lightbox-next');

    prevBtn.addEventListener('click', () => this.prev());
    nextBtn.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const imageContainer = this.element.querySelector('.lightbox-image-container');

    imageContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imageContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },

  /**
   * Handle touch swipe gestures
   * @param {number} startX - Touch start X coordinate
   * @param {number} endX - Touch end X coordinate
   */
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  },

  /**
   * Open lightbox at specific index
   * @param {number} index - Painting index to display
   */
  open(index) {
    this.currentIndex = index;
    this.isOpen = true;

    this.element.classList.add('active');
    this.element.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    this.updateContent();

    // Focus the close button for accessibility
    const closeBtn = this.element.querySelector('.lightbox-close');
    closeBtn.focus();

    // Trap focus within lightbox
    trapFocus(this.element);
  },

  /**
   * Close lightbox
   */
  close() {
    this.isOpen = false;

    this.element.classList.remove('active');
    this.element.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  },

  /**
   * Navigate to previous painting
   */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.paintings.length) % this.paintings.length;
    this.updateContent();
  },

  /**
   * Navigate to next painting
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.paintings.length;
    this.updateContent();
  },

  /**
   * Update lightbox content with current painting
   */
  updateContent() {
    const painting = this.paintings[this.currentIndex];

    if (!painting) return;

    const img = this.element.querySelector('.lightbox-image');
    const infoContainer = this.element.querySelector('.lightbox-info');

    // Update image
    img.src = painting.image;
    img.alt = `${painting.title} by Georgie Originals`;

    // Update info
    infoContainer.innerHTML = '';

    const title = createElement('h2', { className: 'lightbox-title' }, painting.title);
    const details = createElement('div', { className: 'lightbox-details' });

    const metadata = [];

    if (painting.year) {
      metadata.push(createElement('span', {}, painting.year));
    }

    if (painting.medium) {
      metadata.push(createElement('span', {}, painting.medium));
    }

    if (painting.dimensions) {
      metadata.push(createElement('span', {}, painting.dimensions));
    }

    metadata.forEach(item => details.appendChild(item));

    infoContainer.appendChild(title);
    infoContainer.appendChild(details);

    if (painting.description) {
      const description = createElement('p', { className: 'lightbox-description' }, painting.description);
      infoContainer.appendChild(description);
    }

    if (painting.available === false) {
      const soldBadge = createElement('span', { className: 'sold-badge' }, 'Sold');
      infoContainer.appendChild(soldBadge);
    }

    // Update counter
    const counter = createElement('div', { className: 'lightbox-counter' },
      `${this.currentIndex + 1} / ${this.paintings.length}`
    );
    infoContainer.appendChild(counter);

    // Update navigation button states
    this.updateNavigation();
  },

  /**
   * Update navigation button visibility
   */
  updateNavigation() {
    const prevBtn = this.element.querySelector('.lightbox-prev');
    const nextBtn = this.element.querySelector('.lightbox-next');

    // Always show both buttons for circular navigation
    // If you want to hide them at boundaries, uncomment below:
    // prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'block';
    // nextBtn.style.display = this.currentIndex === this.paintings.length - 1 ? 'none' : 'block';
  }
};
