/**
 * Utility functions for Georgie Originals
 */

/**
 * Fetch JSON data from a given URL
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<any>} The parsed JSON data
 */
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching JSON:', error);
    throw error;
  }
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add event listener with support for delegation
 * @param {string} selector - CSS selector for elements
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {Element} parent - Parent element to attach listener to (default: document)
 */
function on(selector, event, handler, parent = document) {
  parent.addEventListener(event, (e) => {
    if (e.target.matches(selector) || e.target.closest(selector)) {
      const target = e.target.matches(selector) ? e.target : e.target.closest(selector);
      handler.call(target, e);
    }
  });
}

/**
 * Simple element creation helper
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Object of attributes to set
 * @param {string|Element|Array} children - Child content
 * @returns {Element} The created element
 */
function createElement(tag, attributes = {}, children = null) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (children) {
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    } else {
      element.appendChild(children);
    }
  }

  return element;
}

/**
 * Trap focus within an element (for accessibility)
 * @param {Element} element - The element to trap focus within
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}
