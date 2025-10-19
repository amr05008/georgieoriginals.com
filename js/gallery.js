/**
 * Gallery Module
 * Handles loading and rendering of paintings from JSON
 */

const Gallery = {
  paintings: [],
  container: null,

  /**
   * Initialize the gallery
   * @param {string} containerSelector - CSS selector for gallery container
   * @param {string} dataUrl - URL to paintings JSON file
   */
  async init(containerSelector, dataUrl) {
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error('Gallery container not found');
      return;
    }

    try {
      // Show loading state
      this.showLoading();

      // Fetch paintings data
      this.paintings = await fetchJSON(dataUrl);

      // Render gallery
      this.render();

      // Initialize lightbox with paintings data
      if (typeof Lightbox !== 'undefined') {
        Lightbox.init(this.paintings);
      }

    } catch (error) {
      this.showError('Failed to load gallery. Please try again later.');
      console.error('Gallery initialization error:', error);
    }
  },

  /**
   * Show loading state
   */
  showLoading() {
    this.container.innerHTML = '<div class="gallery-loading">Loading gallery...</div>';
  },

  /**
   * Show error message
   * @param {string} message - Error message to display
   */
  showError(message) {
    this.container.innerHTML = `<div class="gallery-error">${message}</div>`;
  },

  /**
   * Render the gallery
   */
  render() {
    this.container.innerHTML = '';

    if (!this.paintings || this.paintings.length === 0) {
      this.showError('No paintings available at this time.');
      return;
    }

    const grid = createElement('div', { className: 'gallery-grid' });

    this.paintings.forEach((painting, index) => {
      const item = this.createGalleryItem(painting, index);
      grid.appendChild(item);
    });

    this.container.appendChild(grid);
  },

  /**
   * Create a single gallery item
   * @param {Object} painting - Painting data object
   * @param {number} index - Index in paintings array
   * @returns {Element} Gallery item element
   */
  createGalleryItem(painting, index) {
    const item = createElement('div', {
      className: 'gallery-item',
      dataset: { index }
    });

    const figure = createElement('figure');

    // Create image
    const img = createElement('img', {
      src: painting.thumbnail || painting.image,
      alt: `${painting.title} by Georgie Originals`,
      loading: 'lazy'
    });

    // Create figcaption
    const figcaption = createElement('figcaption', { className: 'painting-info' });

    const title = createElement('h3', { className: 'painting-title' }, painting.title);
    const details = createElement('p', { className: 'painting-details' });

    const detailsText = [
      painting.year,
      painting.medium,
      painting.dimensions
    ].filter(Boolean).join(' • ');

    details.textContent = detailsText;

    figcaption.appendChild(title);
    figcaption.appendChild(details);

    if (painting.available === false) {
      const soldBadge = createElement('span', { className: 'sold-badge' }, 'Sold');
      figcaption.appendChild(soldBadge);
    }

    figure.appendChild(img);
    figure.appendChild(figcaption);
    item.appendChild(figure);

    // Add click handler to open lightbox
    item.addEventListener('click', () => {
      if (typeof Lightbox !== 'undefined') {
        Lightbox.open(index);
      }
    });

    // Add keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${painting.title} in lightbox`);

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof Lightbox !== 'undefined') {
          Lightbox.open(index);
        }
      }
    });

    return item;
  },

  /**
   * Filter paintings by availability
   * @param {boolean|null} available - Filter by availability (null for all)
   */
  filter(available = null) {
    const items = this.container.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
      const painting = this.paintings[index];

      if (available === null || painting.available === available) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
};
