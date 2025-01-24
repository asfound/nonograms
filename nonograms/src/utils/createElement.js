/**
 * Properties of an element.
 * @typedef {Object<string, any>} ElementProps
 */

/**
 * Creates a factory for creating DOM elements.
 * @template {keyof HTMLElementTagNameMap} T - The type of HTML element tag to create.
 * @param {T} tagName - The name of the HTML tag to create.
 * @returns {function(ElementProps): HTMLElementTagNameMap[T]} Element creation function.
 */
function createElementFactory(tagName) {
  /**
   * Creates a DOM element for the given tag.
   * @param {ElementProps} [props] - Properties of an element.
   * @returns {HTMLElementTagNameMap[T]} Created DOM element.
   */
  return function createElement(props = {}) {
    const element = document.createElement(tagName);

    if (props) {
      Object.assign(element, props);
    }

    return element;
  };
}

export const button = createElementFactory('button');

export const dialog = createElementFactory('dialog');

export const div = createElementFactory('div');

export const h1 = createElementFactory('h1');

export const header = createElementFactory('header');

export const main = createElementFactory('main');

